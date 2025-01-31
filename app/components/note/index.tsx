'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import getParagraph from '@lib/getParagraph';
import styles from './note.module.css';
import type { RandomWeirdObjType } from '@lib/types';

export default function Note({ weathercode }) {
  let key: string;
  if (weathercode === 0 || weathercode === 1) {
    key = 'sun';
  } else if (weathercode === 3) {
    key = 'overcast';
  } else if (weathercode === 45 || weathercode === 48) {
    key = 'fog';
  } else if ([61, 63, 65, 66, 67].includes(weathercode)) {
    key = 'rain';
  } else {
    key = 'misc';
  }

  const [randomWeirdObj, setRandomWeirdObj] =
    useState<RandomWeirdObjType>(null);

  // useEffect(() => {
  //   const randomObj = getParagraph(key)
  //   setRandomWeirdObj(randomObj)
  // }, [weathercode])

  useEffect(() => {
    try {
      const storedRandomObj = localStorage.getItem('randomWeirdObj');
      const prevWeathercode = localStorage.getItem('weathercode');
      if (!prevWeathercode || prevWeathercode !== weathercode.toString()) {
        const newRandomObj = getParagraph(key);
        setRandomWeirdObj(newRandomObj);
        localStorage.setItem('randomWeirdObj', JSON.stringify(newRandomObj));
        localStorage.setItem('weathercode', JSON.stringify(weathercode));
      } else {
        const storedRandomObj = localStorage.getItem('randomWeirdObj');
        setRandomWeirdObj(JSON.parse(storedRandomObj));
      }
      // if (!prevWeathercode || (prevWeathercode === weathercode && storedRandomObj)) {
      //   setRandomWeirdObj(JSON.parse(storedRandomObj));
      // } else {
      //   const newRandomObj = getParagraph(key);
      //   setRandomWeirdObj(newRandomObj);
      //   localStorage.setItem('randomWeirdObj', JSON.stringify(newRandomObj));
      //   localStorage.setItem('weathercode', weathercode)
      // }
    } catch (e) {
      console.log(e);
    }
  }, [weathercode]);

  // const randomWeirdObj = getParagraph(key)
  // const randomWeirdObj = useMemo(() => getParagraph(key), [weathercode])

  return (
    <div className={styles.notebox}>
      <h3 className={styles.title}>Note for Today:</h3>
      {randomWeirdObj && (
        <div data-testid="note">
          {randomWeirdObj.paragraphs.map((paragraph: string) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {randomWeirdObj.source && (
            <p className={styles.inspiration}>
              Source of inspiration:{' '}
              <Link href={randomWeirdObj.source.url}>
                {randomWeirdObj.source.name}
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
