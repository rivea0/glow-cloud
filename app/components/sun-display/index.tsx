import Image from 'next/image'
import styles from '@components/styles/styles.module.css'
import stylesSun from './sun.module.css'

export default function SunDisplay({date, sunrise, sunset}) {
  return (
    <>
      <h3>What About the Sun?</h3>
      <h5 style={{fontStyle: 'italic'}}>{date}</h5>
      <section style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '24px', padding: '0 12px', textAlign: 'center'}}>
        <div className={styles.miscItem}>
          <Image src="./misc-icons/sunrise.svg" alt="sunrise icon" width={100} height={100} />
          <div className={stylesSun.sun}>
            <p>The Sun rises at {sunrise},</p>
            <p>oblivious to its significance on our tiny planet.</p>
          </div>
        </div>
        <div className={styles.miscItem}>
          <Image src="./misc-icons/sunset.svg" alt="sunrise icon" width={100} height={100} />
          <div className={stylesSun.sun}>
            <p>It sets at {sunset}, seems frightened.</p> 
            <p>Be a shame if anything happened to it.</p>
          </div>
        </div>
      </section>
    </>
  )
}