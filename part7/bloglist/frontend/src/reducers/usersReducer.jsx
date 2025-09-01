import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      console.log(action);
      return action.payload;
    },
    setUser(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const { setUsers, setUser } = usersSlice.actions;

export const fetchUser = (id) => {
  return async (dispatch) => {
    const res = await usersService.getOne(id);
    dispatch(setUser(res));
  };
};

export default usersSlice.reducer;
