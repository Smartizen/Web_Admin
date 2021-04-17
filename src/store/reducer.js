import * as actions from './actions';

const initialState = {
  user: null,
  deviceType: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        user: action.user,
      };
    case actions.DEVICE_TYPE:
      return {
        ...state,
        deviceType: action.deviceType,
      };
    default:
      return state;
  }
};

export default rootReducer;
