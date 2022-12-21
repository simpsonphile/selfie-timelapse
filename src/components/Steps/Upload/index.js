import { useTimelapseContext } from '../../../contexts/TimelapseContext';
import Header from '../../Header';
import Headline from '../../Headline';
import UploadDropzone from '../../UploadDropzone';

const Upload = () => {
  const {
    actions: { setImages, setCurrentStep },
  } = useTimelapseContext();

  const onFileUpload = (files) => {
    setImages(Object.values(files).map((file) => URL.createObjectURL(file)));
    setCurrentStep('EDIT');
  };

  return (
    <div>
      <Header>
        <Headline>Upload files</Headline>
      </Header>
      <p>choose photos with eyes open</p>
      <UploadDropzone onDrop={onFileUpload} />
    </div>
  );
};

export default Upload;
