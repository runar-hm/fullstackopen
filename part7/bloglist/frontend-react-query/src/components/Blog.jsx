import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useSetNotification } from '../reducers/notificationContext';
import blogService from '../services/blogs';

const Blog = ({ blog, userCreated }) => {
  const [expand, setExpand] = useState(false);

  const queryClient = useQueryClient();

  const setNotification = useSetNotification();

  const removeMutation = useMutation({ mutationFn: blogService.remove });
  const updateMutation = useMutation({ mutationFn: blogService.update });

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleLike = () => {
    const amended = { ...blog, likes: blog.likes + 1 };

    updateMutation.mutate(amended, {
      onSuccess: () => {
        queryClient.setQueryData(['blogs'], (blogs) =>
          blogs.map((b) => (b.id === amended.id ? amended : b))
        );
        setNotification(`You liked blog ${blog.content}`, 5, 'info');
      },
      onError: (e) => {
        console.log(e);
        setNotification(
          `Something went wrong. Vote not registered.`,
          5,
          'error'
        );
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Do you want to delete ${blog.title}`)) {
      removeMutation.mutate(blog, {
        onSuccess: () => {
          queryClient.invalidateQueries(['blogs']);
          setNotification(`You deleted blog ${blog.content}`, 5, 'info');
        },
        onError: (e) => {
          console.log(e);
          setNotification(`Error. Blog not deleted`);
        },
      });
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogHeader = (
    <p className="blogHeader">
      {' '}
      {blog.title} - {blog.author}{' '}
    </p>
  );

  const expandedBlog = (
    <>
      {blogHeader}
      <p className="blogUrl">{blog.url}</p>
      <div className="blogLikes">
        {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <p className="userFullName"> {blog.user.fullName}</p>
      <button id="expandBtn" onClick={toggleExpand}>
        hide
      </button>
      {userCreated && <button onClick={handleDelete}>delete</button>}
    </>
  );

  const contractedBlog = (
    <>
      {blogHeader}
      <button onClick={toggleExpand}>expand</button>
    </>
  );

  return (
    <div style={blogStyle}>
      {expand && expandedBlog}
      {!expand && contractedBlog}
    </div>
  );
};

export default Blog;
