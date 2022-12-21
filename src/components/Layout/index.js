import Header from './Header';
import styles from './styles.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.Layout}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
