import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationReducer';
import blogReducer from './blogReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';

let user = null;

export const raw = window.localStorage.getItem('loggedBlogUser');
if (raw) {
  user = JSON.parse(raw);
}
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
  preloadedState: {
    user,
  },
});

export default store;
