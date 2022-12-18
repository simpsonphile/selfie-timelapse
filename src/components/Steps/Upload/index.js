import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import UploadDropzone from '../../UploadDropzone';

const Upload = () => {
  const {
    actions: { setImages, setCurrentStep },
  } = useTimelapseContext();

  const onFileUpload = (files) => {
    setImages(files);
    setCurrentStep('EDIT');
  };

  return (
    <div>
      <UploadDropzone onDrop={onFileUpload} />
    </div>
  );
};

export default Upload;
