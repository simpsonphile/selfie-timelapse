import * as ACTION_NAMES from './actionNames';
import generateSelfieTimeLapse from '../../services/generateSelfieTimelapse';
import { generateZipURLFromFiles } from '../../services/generateZipFromFiles';

export const setImages =
  ({ dispatch }) =>
  (payload) =>
    dispatch({
      type: ACTION_NAMES.SET_IMAGES,
      payload,
    });

export const setZipUrl =
  ({ dispatch }) =>
  (payload) =>
    dispatch({
      type: ACTION_NAMES.SET_ZIP_URL,
      payload,
    });

export const setCurrentStep =
  ({ dispatch }) =>
  (payload) =>
    dispatch({
      type: ACTION_NAMES.SET_CURRENT_STEP,
      payload,
    });

export const incrementProgress =
  ({ dispatch }) =>
  (payload) =>
    dispatch({
      type: ACTION_NAMES.INCREMENT_PROGRESS,
      payload,
    });

export const setTransformedImages =
  ({ dispatch }) =>
  (payload) =>
    dispatch({
      type: ACTION_NAMES.SET_TRANSFORMED_IMAGES,
      payload,
    });

export const setTimelapseLoading =
  ({ dispatch }) =>
  (payload) =>
    dispatch({
      type: ACTION_NAMES.SET_TIMELAPSE_LOADING,
      payload,
    });

export const generateTimelapse =
  ({ dispatch, getState }) =>
  async () => {
    const { images } = getState();

    const onResolve = () => {
      incrementProgress({ dispatch })();
    };

    setTimelapseLoading({ dispatch })(true);

    const transformedImages = await generateSelfieTimeLapse({
      files: images,
      onResolve,
    });

    if (transformedImages) {
      setTransformedImages({ dispatch })(transformedImages);

      const url = await generateZipURLFromFiles(transformedImages);

      setZipUrl({ dispatch })(url);
      setCurrentStep({ dispatch })('FINISH');
    }

    setTimelapseLoading({ dispatch })(false);
  };
