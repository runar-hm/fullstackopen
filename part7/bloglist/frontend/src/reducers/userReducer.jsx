import { createSlice } from '@reduxjs/toolkit';
import { setToken } from '../services/requests';
import loginService from '../services/login';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      console.log('hello');
      return action.payload;
    },
    logout(state, action) {
      return null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });

    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
    dispatch(setUser(user));
    setToken(user.token);
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogUser');
    setToken(null);
    dispatch(logout());
  };
};

export default userSlice.reducer;
