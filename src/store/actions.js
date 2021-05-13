import axiosClient from 'api';

export const LOGIN = 'LOGIN';
export const adminLogin = ({ email, password }) => async (dispatch) => {
  let data = await axiosClient.post('/auth/login', { email, password });
  if (data.user.role === 0) {
    localStorage.setItem('token', data.token);
    dispatch({ type: LOGIN, user: data.user });
  }
};

export const authLogin = () => async (dispatch) => {
  let data = await axiosClient.get('/auth');
  if (data.user && data.user.role === 0) {
    dispatch({ type: LOGIN, user: data.user });
    // get data
    let watsonDeviceType = await axiosClient.get('/device-type/watson');
    dispatch(setWatsonDeviceType(watsonDeviceType));

    let smartizenDeviceType = await axiosClient.get('/device-type/smartizen');
    dispatch(setSmartizenDeviceType(smartizenDeviceType));

    let functions = await axiosClient.get('/function');
    dispatch(setFunctions(functions));
  }
};

export const logoutAccount = () => async (dispatch) => {
  dispatch({ type: LOGIN, user: null });
};

export const WATSON_DEVICE_TYPE = 'WATSON_DEVICE_TYPE';
export const setWatsonDeviceType = (watsonDeviceType) => async (dispatch) => {
  dispatch({ type: WATSON_DEVICE_TYPE, watsonDeviceType });
};

export const SMARTIZEN_DEVICE_TYPE = 'SMARTIZEN_DEVICE_TYPE';
export const setSmartizenDeviceType = (smartizenDeviceType) => async (dispatch) => {
  dispatch({ type: SMARTIZEN_DEVICE_TYPE, smartizenDeviceType });
};

export const FUNCTIONS = 'FUNCTIONS';
export const setFunctions = (functions) => async (dispatch) => {
  dispatch({ type: FUNCTIONS, functions });
};
