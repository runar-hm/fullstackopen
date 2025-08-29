import Blog from './Blog';
import { useSelector } from 'react-redux';

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const sorted = [...blogs].sort((a, b) => b.likes - a.likes);

  sorted.map((blog) => {
    const userCreated = blog.user.username === user.username ? true : false;
    return <Blog blog={blog} userCreated={userCreated} />;
  });

  return sorted.map((blog) => {
    const userCreated = blog.user.username === user.username ? true : false;
    return <Blog key={blog.id} blog={blog} userCreated={userCreated} />;
  });
};

export default BlogList;
