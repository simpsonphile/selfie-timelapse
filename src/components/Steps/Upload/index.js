import { useTimelapseContext } from '../../../contexts/TimelapseContext';
// import Header from '../../Header';
// import Headline from '../../Headline';
import HeroSection from '../../HeroSection';
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
      <HeroSection>
        <UploadDropzone onDrop={onFileUpload} />
      </HeroSection>
    </div>
  );
};

export default Upload;
