import styles from './styles.module.scss';

const Layout = ({ children }) => {
  return <main className={styles.Layout}>{children}</main>;
};

export default Layout;
