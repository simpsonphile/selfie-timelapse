import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import Button from '../../Button';

const Upload = () => {
  const {
    state: { zipURL },
  } = useTimelapseContext();

  return (
    <div>
      <h2>Download files</h2>
      {!!zipURL && (
        <Button href={zipURL} as="a">
          as zip
        </Button>
      )}
    </div>
  );
};

export default Upload;
