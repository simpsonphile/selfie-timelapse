import classNames from 'classnames';
import styles from './styles.module.scss';

const Header = ({ children, className, ...otherProps }) => (
  <header className={classNames(styles.Header, className)} {...otherProps}>
    {children}
  </header>
);

export default Header;
