'use client'

import { SetStateAction, useState } from 'react'
import Image from 'next/image'
import { beaufortScale, weatherCodes } from '../../lib/utils'
import HourlyDropdown from '@components/hourly-dropdown'
import styles from './hourly.module.css'

type HourlyProps = {
  hourlyData: {
    time: string[],
    temperature_2m: number[],
    relativehumidity_2m: number[],
    weathercode: number[],
    cloudcover: number[],
    visibility: number[],
    windspeed_10m: number[],
    winddirection_10m: number[],
    is_day: (0 | 1)[],
    uv_index: number[]
  },
  currentHour: number
}

export default function Hourly({ hourlyData, currentHour }: HourlyProps) {
  let today = new Date(hourlyData.time[0])
  const todayName = today.toLocaleString('en-us', { weekday: 'long' })
  const [selectedDay, setSelectedDay] = useState(todayName)

  let days = {}
  for (let i = 0; i < hourlyData.time.length; i += 24) {
    days[new Date(hourlyData.time[i]).
        toLocaleString('en-us', { weekday: 'long' })] = hourlyData.time.slice(i, i + 24)
  }

  function handleSelection(e: {
    target: { value: SetStateAction<string> }
  }) {
    setSelectedDay(e.target.value)
  }

  return (
    <section className={styles.hourlyWrapper}>
      <h3 className={styles.hourlyTitle}>Hour by Hour</h3>
      <h5 className={styles.hourlySecondary}><em>For what is left</em></h5>
      <HourlyDropdown days={Object.keys(days)} onChange={handleSelection} />
      {
        days[selectedDay].map((hour: string) => {
          const d = new Date(hour)
          const hourNumber = d.getHours()
          const index = hourlyData.time.findIndex((time: string) => time === hour)
          return (
            selectedDay === todayName ?
            currentHour <= hourNumber &&
            <div className={styles.hourly} key={hour}>
              <HourlyItem
                hourlyData={hourlyData}
                index={index}
                hour={d.toLocaleString('en-us', { hour: 'numeric' })}
              />
            </div>
            :
            <div className={styles.hourly} key={hour}>
              <HourlyItem
                hourlyData={hourlyData}
                index={index}
                hour={d.toLocaleString('en-us', { hour: 'numeric' })}
              />
            </div>
          )
        })}
    </section>
  )
}

export function HourlyItem({ hourlyData, index, hour }) {
  const weatherDescription = `${weatherCodes[
    hourlyData.weathercode[index]
  ].description[0].toUpperCase()}${weatherCodes[
    hourlyData.weathercode[index]
  ].description.slice(1)}`
  const iconName = hourlyData.is_day[index]
    ? weatherCodes[hourlyData.weathercode[index]].iconNameDay
    : weatherCodes[hourlyData.weathercode[index]].iconNameNight
  const temperature = Math.round(hourlyData.temperature_2m[index])
  const humidity = hourlyData.relativehumidity_2m[index]
  const cloudcover = hourlyData.cloudcover[index]
  const winddirection = hourlyData.winddirection_10m[index]
  const windspeed = Math.round(hourlyData.windspeed_10m[index])
  const visibility = hourlyData.visibility[index] / 1000 // To convert meters to kilometers
  const uv_index = hourlyData.uv_index[index]
  
  return (
    <div className={styles.hourlyItemBox} id={index} data-testid="hourlyItem">
      <h2 className={styles.hourlyItemHour}>{hour}</h2>
      <div className={styles.hourlyItemContainer}>
        <Image
          src={`/weather-icons/${iconName}.svg` }
          alt={`${weatherDescription} icon`}
          width={100}
          height={100}
        />
        <div>
          <p>{temperature}<span className={styles.small}>°C</span></p>
          <p>{weatherDescription}</p>
        </div>
      </div>
      <div className={styles.hourlyItemRow}>
      <div className={styles.miscItem}>
        <Image
          src="./misc-icons/humidity.svg"
          alt="humidity icon"
          width={40}
          height={40}
        />
        <p>Humidity:</p>
        <p>{humidity}%</p>
      </div>
      <div className={styles.miscItem}>
        <Image
          src="./misc-icons/cloudy.svg"
          alt="clouds icon"
          width={40}
          height={40}
        />
        <p>Cloudcover:</p>
        <p>{cloudcover}%</p>
      </div>
      </div>
      <div className={styles.hourlyItemRow}>
        <div className={styles.miscItem}>
          <Image
            src="./misc-icons/compass.svg"
            alt="compass icon"
            width={40}
            height={40}
            style={{rotate: `${winddirection}deg`}}
          />
          <p>Wind direction:</p>
          <p>{winddirection}° from the north</p>
        </div>
        <div className={styles.miscItem}>
          <Image
            src={`/misc-icons/wind-beaufort-${beaufortScale(windspeed).scale}.svg`}
            alt="wind beaufort icon"
            width={40}
            height={40}
          />
          <p>Wind speed:</p>
          <p>{windspeed} mph | {beaufortScale(windspeed).description}</p>
        </div>
      </div>
      <div className={styles.hourlyItemRow}>
        <div className={styles.miscItem}>
          <Image
            src="./misc-icons/visibility.svg"
            alt="visibility (mist) icon"
            width={40}
            height={40}
          />
          <p>Visibility:</p>
          <p>{visibility} kms</p>
        </div>
        <div className={styles.miscItem}>
          <Image
            src={`./misc-icons/uv-index${Math.round(uv_index) === 0
                  ? '' : `-${Math.ceil(uv_index)}`}.svg`}
            alt="star icon"
            width={40}
            height={40}
          />
          <p>UV index:</p>
          <p>{uv_index}</p>          
        </div>
      </div>
    </div>
  )
}
