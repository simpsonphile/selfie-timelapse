import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import Button from '../../Button';

const Upload = () => {
  const {
    state: { zipURL },
  } = useTimelapseContext();

  return (
    <div>
      {!!zipURL && (
        <Button href={zipURL} as="a">
          Download files
        </Button>
      )}
    </div>
  );
};

export default Upload;
