'use client'

import Image from 'next/image'
import GoBackButton from '@components/go-back-button'
import styles from '@styles/not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.error}>
        <span className={styles.span}>4</span>
        <Image
          src="/eye.gif"
          alt="eye gif"
          width={100}
          height={100}
        />
        <span className={styles.span}>4</span>
      </div>
      <p>Page not found.</p>
      <GoBackButton />
    </div>
  )
}
