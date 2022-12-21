import styles from './styles.module.scss';

const HeroSection = ({ children }) => (
  <section className={styles.Hero}>
    <div>
      <img src="selfie-timelapse-1.jpg" alt="selfie timelapse 1" />
      <img src="selfie-timelapse-2.jpg" alt="selfie timelapse 2" />
      <img src="selfie-timelapse-3.jpg" alt="selfie timelapse 3" />
    </div>
    <div>
      <h2>Create you own selfie timelapse</h2>
      <p>Create selfie timelapse of your every day photo in seconds.</p>
      <p>Choose your photos and let it auto position for you</p>
      {children}
    </div>
  </section>
);

export default HeroSection;
