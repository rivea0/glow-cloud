import styles from './footer.module.css'
import FooterIcon from '@components/footer-icon'
import { Mail, GitHub, Link } from '@components/icons'


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div data-testid="icons">
        <FooterIcon href="https://github.com/rivea0" icon={<GitHub strokeWidth={2} />} />
        <FooterIcon href="https://rivea0.github.io" icon={<Link strokeWidth={2} />} />
        <FooterIcon href="mailto:edae.space@gmail.com" icon={<Mail strokeWidth={2} />} />
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
