import { useState } from 'react';
import Button from './components/Button';
import FileUploadField from './components/FileUploadField';
import ImageList from './components/ImageList';

function App() {
  const [files, setFiles] = useState({});
  const fileUrls = Object.values(files).map((file) =>
    URL.createObjectURL(file)
  );

  const generate = console.log;
  return (
    <div className="App">
      <FileUploadField label="hehe" multiple onChange={setFiles} />

      <ImageList srcs={fileUrls} />

      {fileUrls.length > 1 && <Button onClick={generate}>generate</Button>}
    </div>
  );
}

export default App;
