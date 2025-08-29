import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const new_b = action.payload;
      return state.map((b) => (b.id === new_b.id ? new_b : b));
    },
    deleteBlog(state, action) {
      const id = action.payload.id;
      return state.filter((b) => b.id !== id);
    },
  },
});

export const { setBlogs, createBlog, updateBlog, deleteBlog } =
  blogSlice.actions;

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    const res = await blogService.create(newBlog);
    dispatch(createBlog(res));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const amendBlog = { ...blog };
    amendBlog.likes++;
    const res = await blogService.update(amendBlog);
    dispatch(updateBlog(res));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    const res = await blogService.remove(blog);

    dispatch(deleteBlog(blog));
  };
};

export default blogSlice.reducer;
