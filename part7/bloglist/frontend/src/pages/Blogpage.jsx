import { useSelector, useDispatch } from 'react-redux';
import Blog from '../components/Blog';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchBlog } from '../reducers/blogReducer';

const Blogpage = () => {
  const user = useSelector((state) => state.user);
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  const dispatch = useDispatch();
  useEffect(() => {
    if (!blog) {
      dispatch(fetchBlog(id));
    }
  }, [id]);

  if (!blog) {
    return <div>blog not found</div>;
  }

  const user_created = user.id === blog.user.id;
  return <Blog blog={blog} user_created={user_created} />;
};

export default Blogpage;
