'use client';

import { useState, createRef, useRef, useMemo } from 'react';
import Image from 'next/image';
import { weatherCodes } from '@lib/constants';
import { DaysDropdown, HoursDropdown } from '@components/hourly-dropdown';
import styles from './hourly.module.css';
import type { IHourlyData } from '@lib/types';
import {
  Humidity,
  Cloudcover,
  WindDirection,
  WindSpeed,
  Visibility,
  UVIndex,
} from '@components/weather-items';
import { getWeatherDescription, getWeatherValues } from '@lib/utils';

export default function Hourly({
  hourlyData,
  currentHour,
}: {
  hourlyData: IHourlyData;
  currentHour: number;
}) {
  const todayName = useMemo(() => {
    let today = new Date(hourlyData.time[0]);
    return today.toLocaleString('en-us', { weekday: 'long' });
  }, [hourlyData.time]);

  const days = useMemo(() => {
    let daysArray = [];
    for (let i = 0; i < hourlyData.time.length; i += 24) {
      daysArray.push(
        new Date(hourlyData.time[i]).toLocaleString('en-us', {
          weekday: 'long',
        })
      );
    }
    return daysArray;
  }, [hourlyData.time]);

  let hours: { hourIndex: number; hourStr: string }[] = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      let hourIndex = i;
      let hourStr =
        i === 0 ? '12 AM' : `${i !== 12 ? i % 12 : 12} ${i < 12 ? 'AM' : 'PM'}`;

      return { hourIndex, hourStr };
    });
  }, []);

  const hourStrs = hours.map((h) => h.hourStr);
  const hoursLeftForToday = hours.filter((h) => currentHour <= h.hourIndex);

  const [selectedDay, setSelectedDay] = useState(todayName);
  const [selectedHour, setSelectedHour] = useState<string>(
    hoursLeftForToday[0].hourStr
  );
  const [showJumpBackToHoursBtn, setShowJumpBackToHoursBtn] = useState(false);
  const hoursRef = useRef(null);

  const hourlyItemRefs =
    selectedDay === todayName
      ? hoursLeftForToday.reduce((acc, value) => {
          acc[value.hourIndex] = createRef();
          return acc;
        }, {})
      : hours.reduce((acc, value) => {
          acc[value.hourIndex] = createRef();
          return acc;
        }, {});

  function handleDaySelection(e: { target: { value: string } }) {
    setSelectedDay(e.target.value);

    // If the selected day is not today, reset the HoursDropdown to start from 12 AM
    if (e.target.value !== todayName) {
      setSelectedHour(hourStrs[0]);
    }
  }

  function handleHourSelection(e: { target: { value: string } }) {
    setSelectedHour(() => {
      const refIdx = hourStrs.indexOf(e.target.value);
      hourlyItemRefs[refIdx].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return e.target.value;
    });

    setShowJumpBackToHoursBtn(true);
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
        <DaysDropdown days={days} onChange={handleDaySelection} />
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
            );
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
                  index={h.hourIndex + days.indexOf(selectedDay) * 24}
                  hour={h.hourStr}
                />
              </div>
            );
          })}
      {showJumpBackToHoursBtn && (
        <div className={styles.jumpBackDiv}>
          <button
            onClick={() => {
              hoursRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
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
  );
}

export function HourlyItem({
  hourlyData,
  index,
  hour,
}: {
  hourlyData: IHourlyData;
  index: number;
  hour: string;
}) {
  const weatherDescription = getWeatherDescription(
    hourlyData.weathercode[index] as keyof typeof weatherCodes
  );
  const iconName = hourlyData.is_day[index]
    ? weatherCodes[hourlyData.weathercode[index]].iconNameDay
    : weatherCodes[hourlyData.weathercode[index]].iconNameNight;
  const {
    temperature,
    humidity,
    cloudcover,
    winddirection,
    windspeed,
    visibility,
    uv_index,
  } = useMemo(() => getWeatherValues(hourlyData, index), [hourlyData, index]);

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
        <Humidity percentage={humidity} />
        <Cloudcover percentage={cloudcover} />
      </div>
      <div className={styles.hourlyItemRow}>
        <WindDirection degrees={winddirection} />
        <WindSpeed speed={windspeed} />
      </div>
      <div className={styles.hourlyItemRow}>
        <Visibility distance={visibility} />
        <UVIndex value={uv_index} />
      </div>
    </div>
  );
}
