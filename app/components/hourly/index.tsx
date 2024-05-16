'use client'

import { useState, createRef, useRef } from 'react'
import Image from 'next/image'
import { beaufortScale, weatherCodes } from '../../lib/utils'
import { DaysDropdown, HoursDropdown } from '@components/hourly-dropdown'
import styles from './hourly.module.css'

type HourlyDataType = {
  time: string[]
  temperature_2m: number[]
  relativehumidity_2m: number[]
  weathercode: number[]
  cloudcover: number[]
  visibility: number[]
  windspeed_10m: number[]
  winddirection_10m: number[]
  is_day: (0 | 1)[]
  uv_index: number[]
}

export default function Hourly({
  hourlyData,
  currentHour,
}: {
  hourlyData: HourlyDataType
  currentHour: number
}) {
  let today = new Date(hourlyData.time[0])
  let days = {}
  for (let i = 0; i < hourlyData.time.length; i += 24) {
    days[
      new Date(hourlyData.time[i]).toLocaleString('en-us', { weekday: 'long' })
    ] = hourlyData.time.slice(i, i + 24)
  }

  let hours: { hourIndex: number; hourStr: string }[] = Array.from(
    { length: 24 },
    (_, i) => {
      let hourIndex = i
      let hourStr =
        i === 0 ? '12 AM' : `${i !== 12 ? i % 12 : 12} ${i < 12 ? 'AM' : 'PM'}`

      return { hourIndex, hourStr }
    }
  )
  const hourStrs = hours.map((h) => h.hourStr)
  const hoursLeftForToday = hours.filter((h) => currentHour <= h.hourIndex)
  const todayName = today.toLocaleString('en-us', { weekday: 'long' })

  const [selectedDay, setSelectedDay] = useState(todayName)
  const [selectedHour, setSelectedHour] = useState<string>(
    hoursLeftForToday[0].hourStr
  )
  const [showJumpBackToHoursBtn, setShowJumpBackToHoursBtn] = useState(false)
  const hoursRef = useRef(null)

  const hourlyItemRefs =
    selectedDay === todayName
      ? hoursLeftForToday.reduce((acc, value) => {
          acc[value.hourIndex] = createRef()
          return acc
        }, {})
      : hours.reduce((acc, value) => {
          acc[value.hourIndex] = createRef()
          return acc
        }, {})

  function handleDaySelection(e: { target: { value: string } }) {
    setSelectedDay(e.target.value)

    // If the selected day is not today, reset the HoursDropdown to start from 12 AM
    if (e.target.value !== todayName) {
      setSelectedHour(hourStrs[0])
    }
  }

  function handleHourSelection(e: { target: { value: string } }) {
    setSelectedHour(() => {
      const refIdx = hourStrs.indexOf(e.target.value)
      hourlyItemRefs[refIdx].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      return e.target.value
    })

    setShowJumpBackToHoursBtn(true)
  }

  return (
    <section className={styles.hourlyWrapper}>
      <h3 className={styles.hourlyTitle} ref={hoursRef}>
        Hour by Hour
      </h3>
      <h5 className={styles.hourlySecondary}>
        <em>For what is left</em>
      </h5>
      <div className={styles.dropdownDiv}>
        <DaysDropdown days={Object.keys(days)} onChange={handleDaySelection} />
        <HoursDropdown
          hours={
            selectedDay === todayName
              ? hoursLeftForToday.map((h) => h.hourStr)
              : hourStrs
          }
          onChange={handleHourSelection}
          selectedHour={selectedHour}
        />
      </div>
      {selectedDay === todayName
        ? hoursLeftForToday.map((h) => {
            return (
              <div
                className={styles.hourly}
                key={h.hourIndex}
                ref={hourlyItemRefs[h.hourIndex]}
              >
                <HourlyItem
                  hourlyData={hourlyData}
                  index={h.hourIndex}
                  hour={h.hourStr}
                />
              </div>
            )
          })
        : hours.map((h) => {
            return (
              <div
                className={styles.hourly}
                key={h.hourIndex}
                ref={hourlyItemRefs[h.hourIndex]}
              >
                <HourlyItem
                  hourlyData={hourlyData}
                  index={h.hourIndex}
                  hour={h.hourStr}
                />
              </div>
            )
          })}
      {showJumpBackToHoursBtn && (
        <div className={styles.jumpBackDiv}>
          <button
            onClick={() => {
              hoursRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
            <span>Back to hours</span>
          </button>
        </div>
      )}
    </section>
  )
}

export function HourlyItem({
  hourlyData,
  index,
  hour,
}: {
  hourlyData: HourlyDataType
  index: number
  hour: string
}) {
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
    <div
      className={styles.hourlyItemBox}
      id={`${index}`}
      data-testid="hourlyItem"
    >
      <h2 className={styles.hourlyItemHour}>{hour}</h2>
      <div className={styles.hourlyItemContainer}>
        <Image
          src={`/weather-icons/${iconName}.svg`}
          alt={`${weatherDescription} icon`}
          width={100}
          height={100}
        />
        <div>
          <p>
            {temperature}
            <span className={styles.small}>°C</span>
          </p>
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
            style={{ rotate: `${winddirection}deg` }}
          />
          <p>Wind direction:</p>
          <p>{winddirection}° from the north</p>
        </div>
        <div className={styles.miscItem}>
          <Image
            src={`/misc-icons/wind-beaufort-${
              beaufortScale(windspeed).scale
            }.svg`}
            alt="wind beaufort icon"
            width={40}
            height={40}
          />
          <p>Wind speed:</p>
          <p>
            {windspeed} mph | {beaufortScale(windspeed).description}
          </p>
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
            src={`./misc-icons/uv-index${
              Math.round(uv_index) === 0 ? '' : `-${Math.ceil(uv_index)}`
            }.svg`}
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
