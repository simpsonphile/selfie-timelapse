import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import Button from '../../Button';
import { BsDownload } from 'react-icons/bs';

const Upload = () => {
  const {
    state: { zipURL },
    actions: { resetStore },
  } = useTimelapseContext();

  return (
    <div>
      <h2>Your timelapse is ready to download!</h2>
      {!!zipURL && (
        <Button href={zipURL} as="a" icoRight={<BsDownload />}>
          download images as zip
        </Button>
      )}
      <Button onClick={resetStore}>Try again</Button>
    </div>
  );
};

export default Upload;
