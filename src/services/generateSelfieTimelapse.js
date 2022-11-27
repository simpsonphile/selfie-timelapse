import FaceDataService from './FaceDataService';

const generateImageFromFile = ({ file }) => {
  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  return img;
};

// const cropImage = ({ image, dx, dy, sx, sy, nWidth, nHeight }) => {
//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');
//   const newImage = document.createElement('img');

//   ctx.drawImage(image, dx, dy);

//   return newImage;
// };

const getCenterOfPoints = (points) => {
  const combinedPoints = points.reduce(
    (prev, cur) => {
      return {
        x: prev.x + cur.x,
        y: prev.y + cur.y,
      };
    },
    { x: 0, y: 0 }
  );

  return {
    x: combinedPoints.x / points.length,
    y: combinedPoints.y / points.length,
  };
};

const getDistanceBetweenPoints = (p1, p2) => {
  return p2.x - p1.x;
};

const generateImagesFromFiles = async (files) => {
  const promises = files.map(
    (file) =>
      new Promise((resolve) => {
        const sourceImg = generateImageFromFile({ file });

        sourceImg.onload = (e) => {
          resolve({
            source: e.path[0].currentSrc,
            naturalWidth: e.path[0].naturalWidth,
            naturalHeight: e.path[0].naturalHeight,
          });
        };
      })
  );

  const resolved = await Promise.all(promises);

  return resolved;
};

const generateSelfieTimeLapse = async ({ files }) => {
  const filesArr = Object.values(files);
  const images = await generateImagesFromFiles(filesArr);

  console.log(images);
  const promises = filesArr.map((img) => {
    const sourceImg = generateImageFromFile({ file: img });
    console.log(sourceImg, sourceImg.naturalWidth, sourceImg.naturalHeight);
    return new Promise((resolve) =>
      resolve(
        FaceDataService.getFaceDetails({
          source: generateImageFromFile({ file: img }),
          displaySize: { width: 600, height: 600 },
        })
      )
    );
  });

  const resolved = await Promise.all(promises);

  const faces = resolved
    .filter((face) => face.length === 1)
    .map((face) => face[0])
    .map((face) => {
      const leftEye = face.landmarks.getLeftEye();
      const rightEye = face.landmarks.getRightEye();
      const leftEyeCenter = getCenterOfPoints(leftEye);
      const rightEyeCenter = getCenterOfPoints(rightEye);
      const eyesDistance = getDistanceBetweenPoints(
        leftEyeCenter,
        rightEyeCenter
      );
      return {
        leftEyeCenter,
        eyesDistance,
      };
    });

  const smallestEyesDistance = faces.reduce((prev, cur, i) => {
    if (i === 0 || cur.eyesDistance < prev) return cur.eyesDistance;
    return prev;
  }, 0);

  const leftEyePositions = faces.map((face) => {
    const ratio = smallestEyesDistance / face.eyesDistance;

    return {
      x: face.leftEyeCenter.x * ratio,
      y: face.leftEyeCenter.y * ratio,
    };
  });

  const smallestLeftEyeDx = leftEyePositions.reduce((prev, cur, i) => {
    if (i === 0 || cur.x < prev) return cur.x;
    return prev;
  }, 0);

  const smallestLeftEyeDy = leftEyePositions.reduce((prev, cur, i) => {
    if (i === 0 || cur.y < prev) return cur.y;
    return prev;
  }, 0);

  const imageTransforms = leftEyePositions.map((leftEyePos) => ({
    dx: smallestLeftEyeDx - leftEyePos.x,
    dy: smallestLeftEyeDy - leftEyePos.y,
  }));

  console.log(smallestEyesDistance, smallestLeftEyeDx, smallestLeftEyeDy);

  console.log(imageTransforms);

  console.log(filesArr);

  // pick smallest image as point of reference
  // calculate resize of images
  // calculate dx dy

  // get only ones that have array with length 1
  // take element left and right eye
  // calculate eye size
  // calculate left eye position
  // map rest of elements and:
  // - calculate eye size
  // - calculate left eye position
  // - check dif size from first
  // - scale to first
  // - calculate photo dx dy
};

export default generateSelfieTimeLapse;
