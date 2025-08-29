import Blog from './Blog';
import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';

const BlogList = ({ user }) => {
  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll().then((blogs) => blogs),
  });

  // While query is loading
  if (blogsQuery.isLoading) {
    return <div>loading data...</div>;
  }

  if (blogsQuery.isError) {
    return <div>Error retrieving data</div>;
  }

  const sorted = [...blogsQuery.data].sort((a, b) => b.likes - a.likes);

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
