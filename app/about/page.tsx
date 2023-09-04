import Link from 'next/link'
import styles from './about.module.css'

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p>Glow Cloud is a daily (and hourly) weather report*, with slightly an absurd take.</p>
        <p>Inspired by the world of <Link href="https://www.welcometonightvale.com">Welcome to Night Vale</Link>. 💜</p>
        <br />
        <p>*With additional information on the Sun.</p>
        <br />
        <p>**And a <em>note for today</em> that sometimes adapts itself to the current weather.</p>
        <hr className={styles.hr} />
        <h4 className={styles.creditsTitle}>Credits:</h4>
        <ul>
          <li>The sources of quotes (or, adaptation of quotes) from Welcome to Night Vale are given where appropriate.</li>
          <li>Weather icons are <Link href="https://bas.dev/work/meteocons">Meteocons by bas.dev</Link>.</li>
          <li>Data from <Link href="https://open-meteo.com/en/docs">Open-Meteo</Link>.</li>
        </ul>
        <div className={styles.back}>
          <Link href="/">Go back</Link>
        </div>
      </div>
    </div>
  )
}
