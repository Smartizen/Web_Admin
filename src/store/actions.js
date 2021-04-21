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
    let deviceType = await axiosClient.get('/device-type');
    dispatch(setDeviceType(deviceType));

    let functions = await axiosClient.get('/function');
    dispatch(setFunctions(functions));
  }
};

export const logoutAccount = () => async (dispatch) => {
  dispatch({ type: LOGIN, user: null });
};

export const DEVICE_TYPE = 'DEVICE_TYPE';
export const setDeviceType = (deviceType) => async (dispatch) => {
  dispatch({ type: DEVICE_TYPE, deviceType });
};

export const FUNCTIONS = 'FUNCTIONS';
export const setFunctions = (functions) => async (dispatch) => {
  dispatch({ type: FUNCTIONS, functions });
};
