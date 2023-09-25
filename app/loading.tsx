import Image from 'next/image'
import styles from '@styles/loading.module.css'

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <Image
        src="/misc-icons/loading.svg"
        alt="Loading..."
        width={75}
        height={75}
      >
      </Image>
    </div>
  )
}
