import * as actions from './actions';

const initialState = {
  user: null,
  watsonDeviceType: [],
  smartizenDeviceType: [],
  functions: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        user: action.user,
      };
    case actions.WATSON_DEVICE_TYPE:
      return {
        ...state,
        watsonDeviceType: action.watsonDeviceType,
      };
    case actions.SMARTIZEN_DEVICE_TYPE:
      return {
        ...state,
        smartizenDeviceType: action.smartizenDeviceType,
      };
    case actions.FUNCTIONS:
      return {
        ...state,
        functions: action.functions,
      };
    default:
      return state;
  }
};

export default rootReducer;
