import Link from 'next/link';
import styles from './footer-icon.module.css';

export default function FooterIcon({ href, icon }) {
  return (
    <Link href={href} className={styles.icon}>
      {icon}
    </Link>
  );
}
