import { useState } from 'react';
import Button from './components/Button';
import FileUploadField from './components/FileUploadField';
import ImageList from './components/ImageList';
import generateSelfieTimeLapse from './services/generateSelfieTimelapse';
import { generateZipURLFromFiles } from './services/generateZipFromFiles';
import './styles/index.scss';
import useAsyncEffect from 'use-async-effect';

function App() {
  const [files, setFiles] = useState({});
  const [generatedImages, setGeneratedImages] = useState([]);
  const [zipURL, setZipURL] = useState('');
  const fileUrls = Object.values(files).map((file) =>
    URL.createObjectURL(file)
  );

  const generate = async () => {
    const newImages = await generateSelfieTimeLapse({ files });

    setGeneratedImages(newImages);
  };

  useAsyncEffect(
    async (isMounted) => {
      if (generatedImages.length) {
        const result = await generateZipURLFromFiles(generatedImages);
        if (isMounted()) {
          setZipURL(result);
        }
      }
    },
    [generatedImages.length]
  );

  return (
    <div className="App">
      <FileUploadField label="hehe" multiple onChange={setFiles} />

      <ImageList srcs={fileUrls} onImageClick={console.log} />

      {!!fileUrls.length && <Button onClick={generate}>generate</Button>}

      <ImageList srcs={generatedImages} />

      {!!zipURL && (
        <Button href={zipURL} as="a">
          Download files
        </Button>
      )}
    </div>
  );
}

export default App;
