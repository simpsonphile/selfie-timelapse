import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import Button from '../../Button';
import { BsDownload } from 'react-icons/bs';
import Headline from '../../Headline';
import Header from '../../Header';

const Upload = () => {
  const {
    state: { zipURL },
    actions: { resetStore, setCurrentStep },
  } = useTimelapseContext();

  const goBack = () => {
    setCurrentStep('EDIT');
  };

  return (
    <div>
      <Header>
        <Headline>Your timelapse is ready to download!</Headline>
      </Header>
      {!!zipURL && (
        <Button href={zipURL} as="a" icoRight={<BsDownload />}>
          download images as zip
        </Button>
      )}
      <Button onClick={resetStore}>Try again</Button>
      <Button onClick={goBack}>Go back to edit</Button>
    </div>
  );
};

export default Upload;
