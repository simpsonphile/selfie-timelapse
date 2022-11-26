import * as faceapi from 'face-api.js';
import { useEffect, useState } from 'react';

const MODEL_URL = process.env.PUBLIC_URL + '/faceapi/';

const displaySize = {
  width: 600,
  height: 600,
};

const useFace = ({ source }) => {
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [detections, setDetections] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ])
        .then(() => {
          setIsModelsLoaded(true);
          console.log('aa');
        })
        .catch((e) => console.log(e));
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (isModelsLoaded) {
      faceapi.matchDimensions(displaySize, displaySize);

      faceapi
        .detectAllFaces(source, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .then((res) => {
          setDetections(faceapi.resizeResults(res, displaySize));
        });
    }
  }, [source, isModelsLoaded]);

  return { detections, isModelsLoaded };
};

export default useFace;
