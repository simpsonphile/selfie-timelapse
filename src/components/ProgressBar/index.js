import styles from './styles.module.scss';

const ProgressBar = ({ parts = 100, done = 0 }) => (
  <div
    className={styles.ProgressBar}
    style={{ '--progress': ((done / parts) * 100).toFixed(2) + '%' }}
  />
);

export default ProgressBar;
