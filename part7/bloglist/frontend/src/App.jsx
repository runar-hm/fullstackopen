import { Container } from '@mui/material';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Notification from './components/Notification';

import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';

import blogService from './services/blogs';

import { setBlogs } from './reducers/blogReducer';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Users from './pages/Users';
import User from './pages/User';
import Blogpage from './pages/Blogpage';

const App = () => {
  const user = useSelector((state) => state.user);
  const msg = useSelector((state) => state.notification.msg);
  const msgType = useSelector((state) => state.notification.type);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      blogService.getAll().then((initBlogs) => dispatch(setBlogs(initBlogs)));
    }
  }, [user]);

  if (!user) {
    return (
      <div>
        <Notification msg={msg} type={msgType} />
        <LoginForm />
      </div>
    );
  }

  return (
    <Container>
      <Router>
        <Navbar />
        <h2>Blogs App</h2>
        <Notification msg={msg} type={msgType} />

        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blogpage />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
