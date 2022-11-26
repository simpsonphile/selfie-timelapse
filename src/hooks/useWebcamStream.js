import { useEffect, useState } from 'react';

const useWebcamStream = () => {
  const [stream, setStream] = useState();

  useEffect(() => {
    if (window.navigator.mediaDevices.getUserMedia) {
      window.navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setStream(stream);
        })
        .catch(() => {
          console.log('Something went wrong!');
        });
    }
  }, []);

  return {
    stream,
  };
};

export default useWebcamStream;
