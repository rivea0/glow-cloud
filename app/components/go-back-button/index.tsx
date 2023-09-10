import Link from 'next/link'
import styles from './go-back-button.module.css'

export default function GoBackButton() {
  return (
    <div className={styles.back}>
      <Link href="/">Go back</Link>
    </div>
  )
}

