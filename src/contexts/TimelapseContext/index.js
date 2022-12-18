import { createContext, useContext, useReducer } from 'react';
import * as ACTIONS from './actions';
import * as ACTION_NAMES from './actionNames';
import bindDispatchToActions from '../../helpers/bindDispatchToActions';
import { basicReducer } from '../../helpers/basicReducer';

export const STEPS = {
  UPLOAD: 'UPLOAD',
  EDIT: 'EDIT',
  FINISH: 'FINISH',
};

const initialState = {
  currentStep: STEPS.UPLOAD,
  progress: 0,
  images: [],
  disabledImages: [],
  transformedImages: [],
  zipURL: '',
  timelapseLoading: false,
};

const TimelapseContext = createContext({ ...initialState });

export const useTimelapseContext = () => useContext(TimelapseContext);

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case ACTION_NAMES.RESET_STORE:
      return {
        ...initialState,
      };
    case ACTION_NAMES.INCREMENT_PROGRESS:
      return {
        ...state,
        progress: state.progress + 1,
      };
    default:
      return basicReducer(state, action);
  }
};

const TimelapseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = bindDispatchToActions(ACTIONS, dispatch, () => state);

  return (
    <TimelapseContext.Provider value={{ state, actions }}>
      {children}
    </TimelapseContext.Provider>
  );
};

export default TimelapseContextProvider;
