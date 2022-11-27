import { useState } from 'react';
import Button from './components/Button';
import FileUploadField from './components/FileUploadField';
import ImageList from './components/ImageList';
import generateSelfieTimeLapse from './services/generateSelfieTimelapse';

function App() {
  const [files, setFiles] = useState({});
  const [generatedImages, setGeneratedImages] = useState([]);
  const fileUrls = Object.values(files).map((file) =>
    URL.createObjectURL(file)
  );

  const generate = async () => {
    const newImages = await generateSelfieTimeLapse({ files });

    setGeneratedImages(newImages);
  };

  return (
    <div className="App">
      <FileUploadField label="hehe" multiple onChange={setFiles} />

      <ImageList srcs={fileUrls} onImageClick={console.log} />

      {!!fileUrls.length && <Button onClick={generate}>generate</Button>}

      <ImageList srcs={generatedImages} />
    </div>
  );
}

export default App;
