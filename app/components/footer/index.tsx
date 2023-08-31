import styles from './footer.module.css'
import FooterIcon from '@components/footer-icon'
import { Mail, GitHub, Link } from '@components/icons'


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <FooterIcon href="https://github.com/rivea0" icon={<GitHub strokeWidth={2} color={'var(--fg)'} />} />
        <FooterIcon href="https://rivea0.github.io" icon={<Link strokeWidth={2} />} />
        <FooterIcon href="mailto:riveazero@gmail.com" icon={<Mail strokeWidth={2} />} />
      </div>
      <div className="end" data-testid="footer-end">
        <p className="">
          &copy;
          {' '}
          {new Date().getFullYear()}
          {' '}
          | Eda Eren
        </p>
      </div>
    </footer>    
  )
}
