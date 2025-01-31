import { headers } from 'next/headers';
import { Suspense } from 'react';
import Loading from '@loading';
import CurrentWeather from '@components/current-weather';
import Hourly from './components/hourly';
import Note from './components/note';
import SunDisplay from './components/sun-display';
import type { ILocationData, IWeatherData } from '@lib/types';

async function getLocationData(ip: string): Promise<ILocationData> {
  const res = await fetch(`https://ipapi.co/${ip}/json/`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to get location data');
  }

  return res.json();
}

async function getWeatherData(
  latitude: string,
  longitude: string
): Promise<IWeatherData> {
  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode,cloudcover,visibility,windspeed_10m,winddirection_10m,is_day,uv_index&daily=sunrise,sunset&current_weather=true&timezone=auto&forecast_days=7`;
  const res = await fetch(weatherURL, { next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error('Failed to get weather data');
  }

  return res.json();
}

export default async function Page() {
  const ip = headers().get('x-forwarded-for');
  let cityName = '';
  let countryName = '';
  let lat = null;
  let lon = null;
  let currentHour = null;
  let date = null;
  let sunriseHour = null;
  let sunsetHour = null;

  try {
    const { city, country_name, latitude, longitude } = await getLocationData(
      ip
    );
    cityName = city;
    countryName = country_name;
    lat = latitude;
    lon = longitude;
  } catch (error) {
    return (
      <>
        <main>
          <Suspense fallback={<Loading />}>
            <p>
              Can't get your location data. In the meantime, why don't try you
              refreshing the page and see if that works?
            </p>
          </Suspense>
        </main>
      </>
    );
  }

  try {
    if (lat && lon) {
      const { current_weather, hourly, daily } = await getWeatherData(
        lat.toString(),
        lon.toString()
      );
      if (current_weather) {
        currentHour = new Date(current_weather.time).getHours();
        date = new Date(current_weather.time).toLocaleString('en-us', {
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        });
      }

      if (daily) {
        sunriseHour = new Date(daily.sunrise[0]).toLocaleString('en-us', {
          hour: 'numeric',
          minute: 'numeric',
        });
        sunsetHour = new Date(daily.sunset[0]).toLocaleString('en-us', {
          hour: 'numeric',
          minute: 'numeric',
        });
      }
      return (
        <>
          <main>
            <Suspense fallback={<Loading />}>
              <CurrentWeather
                weatherData={current_weather}
                city={cityName}
                countryName={countryName}
              />
              <Hourly hourlyData={hourly} currentHour={currentHour} />
              <SunDisplay
                date={date}
                sunrise={sunriseHour}
                sunset={sunsetHour}
              />
              <Note weathercode={current_weather.weathercode} />
            </Suspense>
          </main>
        </>
      );
    }
  } catch (error) {
    return (
      <>
        <main>
          <Suspense fallback={<Loading />}>
            <p>
              Can't get your weather data. In the meantime, why don't try you
              refreshing the page and see if that works?
            </p>
          </Suspense>
        </main>
      </>
    );
  }
}
