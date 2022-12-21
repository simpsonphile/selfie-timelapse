import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import Button from '../../Button';
import Card from '../../Card';
import ImageListPaginated from '../../ImageListPaginated';
import styles from './styles.module.scss';
import Spinner from '../../Spinner';
import Header from '../../Header';
import Headline from '../../Headline';

const Upload = () => {
  const {
    state: { images, disabledImages, timelapseLoading },
    actions: { generateTimelapse, toggleImage },
  } = useTimelapseContext();

  return (
    <div>
      {!!images.length && (
        <Header className={styles.EditHeader}>
          <Headline>Choose uploaded files</Headline>

          <Button
            className={styles.EditHeaderGenerateBtn}
            icoRight={timelapseLoading ? <Spinner /> : undefined}
            onClick={generateTimelapse}
          >
            generate Timelapse
          </Button>
        </Header>
      )}
      {!!images.length && (
        <Card>
          <ImageListPaginated
            srcs={images}
            isImageDisabled={({ src }) => disabledImages.includes(src)}
            onImageClick={({ src }) => toggleImage(src)}
          />
        </Card>
      )}
    </div>
  );
};

export default Upload;
