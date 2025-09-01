import { useRef } from 'react';

import Togglable from '../components/Togglable';
import BlogList from '../components/BlogList';
import BlogForm from '../components/BlogForm';

const Home = ({ user }) => {
  const blogFormRef = useRef();
  return (
    <>
      <div>
        Blog
        <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      </div>

      <h3>Blogs</h3>
      <BlogList user={user} />
    </>
  );
};

export default Home;
