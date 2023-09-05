import CurrentWeather from '@components/current-weather'
import Hourly from './components/hourly'
import Note from './components/note'
import SunDisplay from './components/sun-display'
import { headers } from 'next/headers'

async function getLocationData(ip: string) {
  const res = await fetch(`https://ipapi.co/${ip}/json/`, {next: { revalidate: 3600 }})
 
  if (!res.ok) {
    throw new Error('Failed to get location data')
  }
 
  return res.json()
}


async function getWeatherData(latitude: string, longitude: string) {
  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode,cloudcover,visibility,windspeed_10m,winddirection_10m,is_day,uv_index&daily=sunrise,sunset&current_weather=true&timezone=auto&forecast_days=7`
  const res = await fetch(weatherURL, {next: { revalidate: 0 }})
  
  if (!res.ok) {
    throw new Error('Failed to get weather data')
  }
 
  return res.json()
}

export default async function Page() {
  const ip = headers().get('x-forwarded-for')

  const { city, country_name, latitude, longitude } = await getLocationData(ip)
  const { current_weather, hourly, daily } = await getWeatherData(latitude?.toString(), longitude?.toString())
  const currentHour = new Date(current_weather.time).getHours()
  const date = new Date(current_weather.time).toLocaleString('en-us', {month: 'long', day: 'numeric', weekday: 'long'})
  const sunriseHour = new Date(daily.sunrise[0]).toLocaleString('en-us', {hour: 'numeric', minute: 'numeric'})
  const sunsetHour = new Date(daily.sunset[0]).toLocaleString('en-us', {hour: 'numeric', minute: 'numeric'})

  return (
    <>
      <main>
        <CurrentWeather weatherData={current_weather} city={city} countryName={country_name} />
        <Hourly hourlyData={hourly} currentHour={currentHour} />
        <SunDisplay date={date} sunrise={sunriseHour} sunset={sunsetHour} />
        <Note weathercode={current_weather.weathercode}/>
      </main>
    </>
  )
}
