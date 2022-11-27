import * as faceapi from 'face-api.js';

const MODEL_URL = process.env.PUBLIC_URL + '/faceapi/';

const loadModels = async () => {
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
  ]);

  return true;
};

class FaceDataService {
  static async getFaceDetails({ source, displaySize }) {
    await loadModels();
    faceapi.matchDimensions(displaySize, displaySize);

    const result = await faceapi
      .detectAllFaces(source, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    return faceapi.resizeResults(result, displaySize);
  }
}

export default FaceDataService;
