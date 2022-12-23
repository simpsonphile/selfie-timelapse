import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import Button from '../../Button';
import { BsDownload } from 'react-icons/bs';
import Headline from '../../Headline';
import Header from '../../Header';
import styles from './styles.module.scss';

const Upload = () => {
  const {
    state: { zipURL },
    actions: { resetStore, setCurrentStep },
  } = useTimelapseContext();

  const goBack = () => {
    setCurrentStep('EDIT');
  };

  return (
    <div className={styles.Finish}>
      <Header>
        <Headline>Your timelapse is ready to download!</Headline>
      </Header>

      <div className={styles.FinishButtons}>
        {!!zipURL && (
          <Button href={zipURL} as="a" icoRight={<BsDownload />}>
            download images as zip
          </Button>
        )}

        <Button variation="secondary" onClick={resetStore}>
          Try again
        </Button>

        <Button variation="secondary" onClick={goBack}>
          Go back to edit
        </Button>
      </div>
    </div>
  );
};

export default Upload;
