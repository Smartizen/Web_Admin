import axiosClient from 'api';

export const LOGIN = 'LOGIN';
export const adminLogin = ({ email, password }) => async (dispatch) => {
  let data = await axiosClient.post('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  dispatch({ type: LOGIN, user: data.user });
};

export const authLogin = () => async (dispatch) => {
  let data = await axiosClient.get('/auth');
  if (data.user) dispatch({ type: LOGIN, user: data.user });
};

export const logoutAccount = () => async (dispatch) => {
  dispatch({ type: LOGIN, user: null });
};
