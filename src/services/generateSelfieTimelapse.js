import FaceDataService from './FaceDataService';

const generateImageFromFile = ({ file }) => {
  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  return img;
};

const transformImage = async (image, scale, dx, dy, nWidth, nHeight) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const newImage = document.createElement('img');
  canvas.width = nWidth;
  canvas.height = nHeight;

  ctx.drawImage(image, dx, dy, image.width * scale, image.height * scale);

  const url = canvas.toDataURL();

  newImage.src = url;

  return await new Promise((resolve) => {
    newImage.onload = (e) => resolve(e.target);
  });
};

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
        const source = generateImageFromFile({ file });

        source.onload = (e) => {
          resolve({
            source,
            naturalWidth: e.path[0].naturalWidth,
            naturalHeight: e.path[0].naturalHeight,
          });
        };
      })
  );

  const resolved = await Promise.all(promises);

  return resolved;
};

const generateFaceDetailsFromImages = async (images) => {
  const promises = images.map(
    (img) =>
      new Promise((resolve) =>
        resolve(
          FaceDataService.getFaceDetails({
            source: img.source,
            displaySize: { width: img.naturalWidth, height: img.naturalHeight },
          })
        )
      )
  );

  const resolved = await Promise.all(promises);

  return resolved;
};

const generateSelfieTimeLapse = async ({ files }) => {
  const filesArr = Object.values(files);
  const images = await generateImagesFromFiles(filesArr);

  const faceDetails = await generateFaceDetailsFromImages(images);

  const faces = faceDetails
    .map((face, i) => ({ face: face?.[0], source: images[i] }))
    .filter(({ face }) => !!face)
    .map(({ face, source }) => {
      const leftEye = face.landmarks.getLeftEye();
      const rightEye = face.landmarks.getRightEye();
      const leftEyeCenter = getCenterOfPoints(leftEye);
      const rightEyeCenter = getCenterOfPoints(rightEye);
      const eyesDistance = getDistanceBetweenPoints(
        leftEyeCenter,
        rightEyeCenter
      );
      return {
        source,
        leftEyeCenter,
        eyesDistance,
      };
    });

  const smallestEyesDistance = faces.reduce((prev, cur, i) => {
    if (i === 0 || cur.eyesDistance < prev) return cur.eyesDistance;
    return prev;
  }, 0);

  const leftEyePositions = faces.map((face) => {
    const scale = smallestEyesDistance / face.eyesDistance;

    return {
      scale,
      x: face.leftEyeCenter.x * scale,
      y: face.leftEyeCenter.y * scale,
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
    scale: leftEyePos.scale,
    dx: smallestLeftEyeDx - leftEyePos.x,
    dy: smallestLeftEyeDy - leftEyePos.y,
  }));

  const theSmallestWidth = imageTransforms.reduce((prev, cur, i) => {
    const curSmallestWidth = faces[i].source.naturalWidth * cur.scale + cur.dx;
    if (curSmallestWidth < prev) return curSmallestWidth;
    return prev;
  }, 10000);

  const theSmallestHeight = imageTransforms.reduce((prev, cur, i) => {
    const curSmallestHeight =
      faces[i].source.naturalHeight * cur.scale + cur.dy;
    if (curSmallestHeight < prev) return curSmallestHeight;
    return prev;
  }, 10000);

  console.log(theSmallestHeight, theSmallestWidth);

  const newImages = await Promise.all(
    faces.map(({ source }, i) => {
      const { scale, dx, dy } = imageTransforms[i];
      return transformImage(
        source.source,
        scale,
        dx,
        dy,
        theSmallestWidth,
        theSmallestHeight
      );
    })
  );

  return newImages.map((img) => img.currentSrc);
};

export default generateSelfieTimeLapse;
