'use client'

import styles from './header.module.css'
import Link from 'next/link'
import { DM_Sans } from 'next/font/google'
import { useState } from 'react'
import Logo from '@components/logo'
import ThemeSwitcher from '@components/theme-switcher'
import HeaderMenu from '@components/header-menu'
import { Menu } from '@components/icons'
const dm_sans = DM_Sans({ subsets: ['latin'], weight: '300' })

export default function Header() {

  const [show, setShow] = useState(false)

  function handleClick() {
    setShow(prevShow => !prevShow)
  }

  return (
    <div className={`${styles.header} ${dm_sans.className}`}>
      <Link href='/'><Logo /></Link>
      <div className={styles.right}>
        <ThemeSwitcher />
        <HeaderMenu icon={<Menu strokeWidth={2} />} onClick={handleClick}>
          {show && <div className={styles.aboutText}><Link href='/about' className={styles.about}>What is this site?</Link></div>}
        </HeaderMenu>
      </div>
  </div>
  )
}
