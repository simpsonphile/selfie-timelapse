import Image from '../Image';
import styles from './styles.module.scss';

const ImageList = ({
  srcs,
  ImageComponent = Image,
  onImageClick,
  isImageDisabled,
}) => {
  return (
    <div className={styles.ImageList}>
      {srcs.map((src, index) => (
        <ImageComponent
          key={src}
          className={
            isImageDisabled({ src }) ? styles.ImageListImageDisabled : ''
          }
          src={src}
          alt={`image ${index}`}
          onClick={() => onImageClick({ src, index })}
        />
      ))}
    </div>
  );
};

export default ImageList;
