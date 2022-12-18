import * as ACTION_NAMES from './actionNames';
import generateSelfieTimeLapse from '../../services/generateSelfieTimelapse';
import { generateZipURLFromFiles } from '../../services/generateZipFromFiles';

export const resetStore =
  ({ dispatch }) =>
  () =>
    dispatch({
      type: ACTION_NAMES.RESET_STORE,
    });

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

export const setProgress =
  ({ dispatch }) =>
  (payload) =>
    dispatch({
      type: ACTION_NAMES.SET_PROGRESS,
      payload,
    });

export const toggleImage =
  ({ dispatch, getState }) =>
  (src) => {
    const { disabledImages } = getState();
    const isToggled = disabledImages.includes(src);

    if (isToggled) {
      disabledImages.splice(disabledImages.indexOf(src), 1);
    } else {
      disabledImages.push(src);
    }

    return dispatch({
      type: ACTION_NAMES.SET_DISABLED_IMAGES,
      payload: disabledImages,
    });
  };

export const generateTimelapse =
  ({ dispatch, getState }) =>
  async () => {
    const { images } = getState();

    const onResolve = () => {
      incrementProgress({ dispatch })();
    };

    setTimelapseLoading({ dispatch })(true);
    setProgress({ dispatch })(0);

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
