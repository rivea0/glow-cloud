import Image from 'next/image';
import { beaufortScale } from '../../lib/utils';
import styles from './weather-items.module.css';
import type { CSSProperties } from 'react';

function WeatherItem({
  imagePath,
  imageAltText,
  imageStyle,
  title,
  info,
}: {
  imagePath: string;
  imageAltText: string;
  imageStyle?: CSSProperties;
  title: string;
  info: string;
}) {
  return (
    <div className={styles.weatherItem}>
      <Image
        src={imagePath}
        alt={imageAltText}
        width={40}
        height={40}
        style={imageStyle}
      />
      <p>{title}</p>
      <p>{info}</p>
    </div>
  );
}

export function Humidity({ percentage }) {
  return (
    <WeatherItem
      imagePath="./misc-icons/humidity.svg"
      imageAltText="humidity icon"
      title="Humidity:"
      info={`${percentage}%`}
    />
  );
}

export function Cloudcover({ percentage }) {
  return (
    <WeatherItem
      imagePath="./misc-icons/cloudy.svg"
      imageAltText="clouds icon"
      title="Cloudcover:"
      info={`${percentage}%`}
    />
  );
}

export function WindDirection({ degrees }) {
  return (
    <WeatherItem
      imagePath="./misc-icons/compass.svg"
      imageAltText="compass icon"
      imageStyle={{ rotate: `${degrees}deg` }}
      title="Wind direction:"
      info={`${degrees}° from the north`}
    />
  );
}

export function WindSpeed({ speed }) {
  return (
    <WeatherItem
      imagePath={`/misc-icons/wind-beaufort-${beaufortScale(speed).scale}.svg`}
      imageAltText="wind beaufort icon"
      title="Wind speed:"
      info={`${speed} mph | ${beaufortScale(speed).description}`}
    />
  );
}

export function Visibility({ distance }) {
  // distance in kms
  return (
    <WeatherItem
      imagePath="./misc-icons/visibility.svg"
      imageAltText="visibility (mist) icon"
      title="Visibility:"
      info={`${distance} kms`}
    />
  );
}

export function UVIndex({ value }) {
  return (
    <WeatherItem
      imagePath={`./misc-icons/uv-index${
        Math.round(value) === 0 ? '' : `-${Math.ceil(value)}`
      }.svg`}
      imageAltText="uv index icon"
      title="UV index:"
      info={`${value}`}
    />
  );
}
