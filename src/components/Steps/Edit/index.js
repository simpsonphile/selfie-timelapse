import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import Button from '../../Button';
import Card from '../../Card';
import ImageListPaginated from '../../ImageListPaginated';
import styles from './styles.module.scss';
import { useMemo } from 'react';
import Spinner from '../../Spinner';
const Upload = () => {
  const {
    state: { images, disabledImages, timelapseLoading },
    actions: { generateTimelapse, toggleImage },
  } = useTimelapseContext();

  const imageUrls = useMemo(
    () => Object.values(images).map((img) => URL.createObjectURL(img)),
    [images]
  );

  return (
    <div>
      {!!imageUrls.length && (
        <div className={styles.EditHeader}>
          <h2>Choose uploaded files</h2>
          <Button
            className={styles.EditHeaderGenerateBtn}
            icoRight={timelapseLoading ? <Spinner /> : undefined}
            onClick={generateTimelapse}
          >
            generate Timelapse
          </Button>
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
