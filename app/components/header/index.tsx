import styles from './header.module.css';
import Link from 'next/link';
import { Averia_Libre } from 'next/font/google'
import Logo from '@components/logo'
import ThemeSwitcher from '@components/theme-switcher'

const averiaLibre = Averia_Libre({ subsets: ['latin'], weight: ['300', '700'] })


export default function Header() {
  return (
    <div className={`${styles.header} ${averiaLibre.className}`}>
      <Link href='/'><Logo /></Link>
      <div className={styles.right}>
        <ThemeSwitcher />
        <Link href='/about' className={styles.about}>What is this site?</Link>
      </div>
  </div>
  )
}
