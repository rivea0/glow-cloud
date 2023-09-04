import styles from './hourly-dropdown.module.css'

export default function HourlyDropdown({ days, onChange }) {
  return (
    <>
      <label htmlFor="hourlyDay">Select day: </label>
      <select name="hourlyDay" id="hourlyDay" onChange={onChange} className={styles.dropdown}>
        {days.map((day: string) => <option value={day} key={day}>{day}</option> )}
      </select>
    </>
  )
}
