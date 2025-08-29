import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, userCreated }) => {
  const [expand, setExpand] = useState(false);

  const dispatch = useDispatch();

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleLike = () => {
    try {
      dispatch(likeBlog(blog));
      dispatch(setNotification(`You liked blog ${blog.content}`, 5, 'info'));
    } catch {
      dispatch(
        setNotification(
          `Something went wrong. Vote not registered.`,
          5,
          'error'
        )
      );
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Do you want to delete ${blog.title}`)) {
      try {
        dispatch(removeBlog(blog));
        dispatch(setNotification(`${blog.title} deleted.`, 5, 'info'));
      } catch {
        dispatch(
          setNotification(`Something went wrong. Blog not deleted.`, 5, 'error')
        );
      }
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
