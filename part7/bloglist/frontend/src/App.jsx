import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';

import blogService from './services/blogs';

import { setBlogs } from './reducers/blogReducer';
import { setUser, logout } from './reducers/userReducer';

const App = () => {
  const user = useSelector((state) => state.user);
  const msg = useSelector((state) => state.notification.msg);
  const msgType = useSelector((state) => state.notification.type);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    const raw = window.localStorage.getItem('loggedBlogUser');
    if (raw) {
      const parsed = JSON.parse(raw);
      dispatch(setUser(parsed));
      blogService.setToken(parsed.token);
    } else {
      blogService.setToken(null);
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((initBlogs) => dispatch(setBlogs(initBlogs)));
    }
  }, [user]);

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogUser');
    blogService.setToken(null);
    dispatch(logout());
  };

  if (!user) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification msg={msg} type={msgType} />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs App</h2>
      <Notification msg={msg} type={msgType} />
      <div>
        <p>Logged in as: {user.username} </p>
        <button onClick={handleLogout}>log out</button>
      </div>

      <div>
        Blog
        <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      </div>

      <h3>Blogs</h3>
      <BlogList user={user} />
    </div>
  );
};

export default App;
