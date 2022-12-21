import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import Button from '../../Button';
import Card from '../../Card';
import ImageListPaginated from '../../ImageListPaginated';
import styles from './styles.module.scss';
import Spinner from '../../Spinner';
import Header from '../../Header';
import Headline from '../../Headline';
import { BsChevronLeft } from 'react-icons/bs';

const Upload = () => {
  const {
    state: { images, disabledImages, timelapseLoading },
    actions: { generateTimelapse, toggleImage, setCurrentStep },
  } = useTimelapseContext();

  return (
    <div>
      {!!images.length && (
        <Header className={styles.EditHeader}>
          <div className={styles.EditHeaderTitle}>
            <Button
              variation="transparent"
              onClick={() => setCurrentStep('UPLOAD')}
            >
              <BsChevronLeft size={28} strokeWidth={2} />
            </Button>
            <Headline>Choose uploaded files</Headline>
          </div>

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
