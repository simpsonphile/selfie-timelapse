import styles from './styles.module.scss';

const Headline = ({ as: Component = 'h2', children }) => (
  <Component className={styles.Headline}>{children}</Component>
);

export default Headline;
