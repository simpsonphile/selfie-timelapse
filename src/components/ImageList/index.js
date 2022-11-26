import Image from '../Image';
import styles from './styles.module.scss';

const ImageList = ({ srcs }) => {
  return (
    <div className={styles.ImageList}>
      {srcs.map((src, index) => (
        <Image key={src} src={src} alt={`image ${index}`} />
      ))}
    </div>
  );
};

export default ImageList;
