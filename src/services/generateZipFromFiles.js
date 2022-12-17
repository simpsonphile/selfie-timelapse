import JSZip from 'jszip';

export const generateZipURLFromFiles = async (files) => {
  const zip = new JSZip();
  const folder = zip.folder('images');

  for (let file of files) {
    const blob = await fetch(file).then((res) => res.blob());
    folder.file('image' + Math.random(), blob);
  }

  const zipURL = await zip.generateAsync({ type: 'blob' });

  return URL.createObjectURL(zipURL);
};
