import { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import LoginForm from './components/LoginForm';

import { useNotificationValue } from './reducers/notificationContext';

import { useUserDispatch, useUserValue } from './reducers/userContext';

const App = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();

  const msg = useNotificationValue();
  const msgType = useNotificationValue();

  const blogFormRef = useRef();

  useEffect(() => {
    const raw = window.localStorage.getItem('loggedBlogUser');
    if (raw) {
      const parsed = JSON.parse(raw);
      userDispatch({ type: 'SETUSER', payload: parsed });
      blogService.setToken(parsed.token);
    } else {
      blogService.setToken(null);
    }
  }, [user]);

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogUser');
    blogService.setToken(null);
    userDispatch({ type: 'CLEARUSER' });
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
