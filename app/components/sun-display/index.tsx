import Image from 'next/image'
import styles from '@components/styles/styles.module.css'
import stylesSun from './sun.module.css'

export default function SunDisplay({date, sunrise, sunset}) {
  return (
    <>
      <h3 className={stylesSun.header}>What About the Sun?</h3>
      <h5 className={stylesSun.date}>{date}</h5>
      <section className={stylesSun.sunContainer}>
        <div className={styles.miscItem}>
          <Image src="./misc-icons/sunrise.svg" alt="sunrise icon" width={100} height={100} />
          <div className={stylesSun.sun} data-testid="sunrise">
            <p>The Sun rises at <span className={stylesSun.time}>{sunrise}</span>, oblivious to its significance on our tiny planet.</p>
          </div>
        </div>
        <div className={styles.miscItem} data-testid="sunset">
          <Image src="./misc-icons/sunset.svg" alt="sunset icon" width={100} height={100} />
          <div className={stylesSun.sun}>
            <p>It sets at <span className={stylesSun.time}>{sunset}</span>, seems frightened.</p> 
            <p>Be a shame if anything happened to it.</p>
          </div>
        </div>
      </section>
    </>
  )
}