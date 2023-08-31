import Rate from '../rate'
import styles from '@components/styles/styles.module.css'


export default function RateAndRant() {
  return (
    // <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', margin: '4rem', gap: '18px'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '24px', padding: '0 12px'}}>
    {/* <div style={{display: 'flex', gap: '25px'}}> */}
      {/* <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1}}> */}
      <div className={styles.miscItem}>
        Rate this weather:
        <Rate />
      </div>
      <div className={styles.miscItem}>
        <Rant />
      </div>
    </div>
  )
}

export function Rant() {
  return (
    <>
      <form action="" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <label htmlFor="rant">Talk about the weather:</label>
        <textarea name="rant" id="" placeholder="What do you think?"></textarea>
        {/* <input type="text" name="rant" id="rant" placeholder='What do you think?'/> */}
        <button type="button">Speak into the void</button>
      </form>
    </>
  )
}

// style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}