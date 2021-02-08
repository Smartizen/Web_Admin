import * as actions from './actions';

const initialState = {};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_THREEBOX:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default rootReducer;
