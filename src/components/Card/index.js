import classNames from 'classnames';
import styles from './styles.module.scss';

const Card = ({ as: Component = 'div', className, children }) => {
  const classes = classNames(styles.Card, className);
  return <Component className={classes}>{children}</Component>;
};

export default Card;
