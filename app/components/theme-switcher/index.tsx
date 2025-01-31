'use client';

import styles from './theme-switcher.module.css';
import { Moon, Sun } from '@components/icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher({
  iconSize = 24,
  strokeWidth,
}: {
  iconSize?: number;
  strokeWidth?: number;
}) {
  const { theme: activeTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <button
          onClick={() => setTheme(activeTheme === 'light' ? 'dark' : 'light')}
          aria-label="Change the theme"
          className={styles.themeSwitcher}
        >
          {activeTheme === 'light' ? (
            <Moon size={iconSize} strokeWidth={strokeWidth || 2} />
          ) : (
            <Sun size={iconSize} strokeWidth={strokeWidth || 2} />
          )}
        </button>
      )}
    </>
  );
}
