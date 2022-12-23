import classNames from 'classnames';
import styles from './styles.module.scss';

const Link = ({ children, className, ...otherProps }) => (
  <a className={classNames(styles.Link, className)} {...otherProps}>
    {children}
  </a>
);

export default Link;
