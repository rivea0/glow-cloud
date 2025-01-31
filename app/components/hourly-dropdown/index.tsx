import styles from './hourly-dropdown.module.css';

export function HoursDropdown({
  hours,
  onChange,
  selectedHour,
}: {
  hours: string[];
  onChange: (e: { target: { value: string } }) => void;
  selectedHour: string;
}) {
  return (
    <div className={styles.dropdownItem}>
      <label htmlFor="hourlyHour">Jump to hour: </label>
      <select
        name="hourlyHour"
        id="hourlyHour"
        onChange={onChange}
        className={styles.dropdown}
        value={selectedHour}
      >
        {hours.map((hour) => (
          <option value={hour} key={hour}>
            {hour}
          </option>
        ))}
      </select>
    </div>
  );
}

export function DaysDropdown({
  days,
  onChange,
}: {
  days: string[];
  onChange: (e: { target: { value: string } }) => void;
}) {
  return (
    <div>
      <label htmlFor="hourlyDay">Select day: </label>
      <select
        name="hourlyDay"
        id="hourlyDay"
        onChange={onChange}
        className={styles.dropdown}
      >
        {days.map((day) => (
          <option value={day} key={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
}
