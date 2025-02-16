import { beaufortScale } from '@lib/utils';
import { weatherCodes } from '@lib/constants';
import Image from 'next/image';
import styles from '@components/styles/styles.module.css';
import stylesCurrent from './current.module.css';
import type { ICurrentWeather } from '@lib/types';

export default function CurrentWeather({
  weatherData,
  city,
  countryName,
}: {
  weatherData: ICurrentWeather;
  city: string;
  countryName: string;
}) {
  const d = new Date(weatherData.time);
  const dateStr = d.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  const weatherDescription = `${weatherCodes[
    weatherData.weathercode
  ].description[0].toUpperCase()}${weatherCodes[
    weatherData.weathercode
  ].description.slice(1)}`;

  return (
    weatherData && (
      <section className={styles.current}>
        <div className={stylesCurrent.currentWeatherBox}>
          <Image
            src={`/weather-icons/${
              weatherData.is_day
                ? weatherCodes[weatherData.weathercode].iconNameDay
                : weatherCodes[weatherData.weathercode].iconNameNight
            }.svg`}
            width={350}
            height={350}
            alt={weatherCodes[weatherData.weathercode].description}
            className={stylesCurrent.currentImage}
            priority={true}
          />
          <h1 className={stylesCurrent.temperature} data-testid="temperature">
            {Math.round(weatherData.temperature)}
            <span className={stylesCurrent.degree}>°C</span>
          </h1>
          <p className={stylesCurrent.date}>{dateStr}</p>
          <p
            className={stylesCurrent.descriptionText}
            data-testid="description"
          >
            <span className={stylesCurrent.description}>
              {weatherDescription}
            </span>{' '}
            in {city}, {countryName}
          </p>
          <div className={stylesCurrent.wind}>
            <div className={styles.miscItem}>
              <Image
                src="./misc-icons/compass.svg"
                alt="compass icon"
                width={45}
                height={45}
                style={{ rotate: `${weatherData.winddirection}deg` }}
              />
              <p>Wind direction:</p>
              <p>{weatherData.winddirection}° from the north</p>
            </div>
            <div className={styles.miscItem}>
              <Image
                src={`/misc-icons/wind-beaufort-${
                  beaufortScale(Math.round(weatherData.windspeed)).scale
                }.svg`}
                alt="wind beaufort icon"
                width={45}
                height={45}
              />
              <p>Wind speed:</p>
              <p>
                {weatherData.windspeed} mph |{' '}
                {beaufortScale(Math.round(weatherData.windspeed)).description}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  );
}
