import { FileUploader } from 'react-drag-drop-files';

const FileUploadField = ({ label, types, onChange, multiple }) => {
  return (
    <FileUploader
      multiple={multiple}
      name={label}
      handleChange={onChange}
      types={types}
    />
  );
};

export default FileUploadField;
