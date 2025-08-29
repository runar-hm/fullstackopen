import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
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
    blogService.setToken(user.token);
  };
};

export default userSlice.reducer;
