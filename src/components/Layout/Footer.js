import Link from '../Link';
import styles from './styles.module.scss';

const Footer = () => (
  <footer className={styles.Footer}>
    <Link
      href="https://www.buymeacoffee.com/simpsonphile"
      rel="nofollow noreferrer"
      target="_blank"
    >
      Buy me a coffee
    </Link>
  </footer>
);

export default Footer;
