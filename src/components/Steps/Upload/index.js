import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import FileUploadField from '../../FileUploadField';

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
      <FileUploadField multiple onChange={onFileUpload} />
    </div>
  );
};

export default Upload;
