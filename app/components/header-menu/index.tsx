import styles from './header-menu.module.css'

export default function HeaderMenu({ icon, onClick, children }) {
  return (
    <div className={styles.menu}>
      <button onClick={onClick} className={styles.menuButton}>{icon}</button>
      {children}
    </div>
  )
}
