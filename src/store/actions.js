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
  if (data.user && data.user.role === 0) dispatch({ type: LOGIN, user: data.user });
};

export const logoutAccount = () => async (dispatch) => {
  dispatch({ type: LOGIN, user: null });
};

export const DEVICE_TYPE = 'DEVICE_TYPE';
export const setDeviceType = (deviceType) => async (dispatch) => {
  dispatch({ type: DEVICE_TYPE, deviceType });
};
