import { useDropzone } from 'react-dropzone';
import styles from './styles.module.scss';
import { BsUpload } from 'react-icons/bs';

const UploadDropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div {...getRootProps()} className={styles.UploadDropzone}>
      <input {...getInputProps()} />
      <BsUpload />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default UploadDropzone;
