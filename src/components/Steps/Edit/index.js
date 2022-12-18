import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import Button from '../../Button';
import Card from '../../Card';
import ImageListPaginated from '../../ImageListPaginated';
import ProgressBar from '../../ProgressBar';
import styles from './styles.module.scss';
import { useMemo } from 'react';

const Upload = () => {
  const {
    state: { images, disabledImages, progress, timelapseLoading },
    actions: { generateTimelapse, toggleImage },
  } = useTimelapseContext();

  const imageUrls = useMemo(
    () => Object.values(images).map((img) => URL.createObjectURL(img)),
    [images]
  );

  return (
    <div>
      <h2>Choose/edit uploaded files</h2>
      {!!imageUrls.length && (
        <div className={styles.EditHeader}>
          <Button onClick={generateTimelapse}>generate</Button>
          {timelapseLoading && (
            <ProgressBar done={progress} parts={images.length} />
          )}
        </div>
      )}
      {!!imageUrls.length && (
        <Card>
          <ImageListPaginated
            srcs={imageUrls}
            isImageDisabled={({ src }) => disabledImages.includes(src)}
            onImageClick={({ src }) => toggleImage(src)}
          />
        </Card>
      )}
    </div>
  );
};

export default Upload;
