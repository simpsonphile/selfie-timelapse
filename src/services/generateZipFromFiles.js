import JSZip from 'jszip';

export const generateZipURLFromFiles = async (files) => {
  const zip = new JSZip();
  const folder = zip.folder('images');

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const blob = await fetch(file).then((res) => res.blob());
    folder.file('image' + i + '.jpg', blob);
  }

  const zipURL = await zip.generateAsync({ type: 'blob' });

  return URL.createObjectURL(zipURL);
};
