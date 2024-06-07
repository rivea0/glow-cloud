'use client'
 
import { useEffect } from 'react'
import styles from '@styles/error.module.css'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className={styles.errorContainer}>
      <h2>Something went wrong!</h2>
      <button
      className={styles.resetBtn}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}