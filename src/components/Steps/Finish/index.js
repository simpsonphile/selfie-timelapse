import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import Button from '../../Button';

const Upload = () => {
  const {
    state: { zipURL },
    actions: { resetStore },
  } = useTimelapseContext();

  return (
    <div>
      <h2>Your timelapse is ready to download!</h2>
      {!!zipURL && (
        <Button href={zipURL} as="a">
          download images as zip
        </Button>
      )}
      <Button onClick={resetStore}>Try again</Button>
    </div>
  );
};

export default Upload;
