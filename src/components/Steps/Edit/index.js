import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import Button from '../../Button';
import Card from '../../Card';
import ImageListPaginated from '../../ImageListPaginated';
import ProgressBar from '../../ProgressBar';
import styles from './styles.module.scss';

const Upload = () => {
  const {
    state: { images, progress, timelapseLoading },
    actions: { generateTimelapse },
  } = useTimelapseContext();

  const imageUrls = Object.values(images).map((img) =>
    URL.createObjectURL(img)
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
          <ImageListPaginated srcs={imageUrls} onImageClick={console.log} />
        </Card>
      )}
    </div>
  );
};

export default Upload;
