import { useDispatch } from 'react-redux';
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { List, ListItem, Stack, TextField, Button } from '@mui/material';

const Blog = ({ blog, userCreated }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    try {
      dispatch(likeBlog(blog));
      dispatch(setNotification(`You liked blog ${blog.title}`, 5, 'info'));
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

  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    try {
      dispatch(commentBlog(blog.id, comment));
    } catch (exception) {
      setNotification('Error. Comment not registered', 5, 'error');
    }
  };

  const blogHeader = (
    <p className="blogHeader">
      {' '}
      {blog.title} - {blog.author}{' '}
    </p>
  );

  return (
    <Stack>
      <h2>{blogHeader}</h2>
      <p className="blogUrl">URL to blog: {blog.url}</p>
      <div className="blogLikes">
        {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <p className="userFullName">Full name: {blog.user.fullName}</p>
      {userCreated && <button onClick={handleDelete}>delete</button>}

      <h3>Comments</h3>
      <List>
        {blog.comments.map((c, i) => (
          <ListItem key={i}>{c}</ListItem>
        ))}
      </List>
      <Stack component="form" sx={{}} spacing={1} onSubmit={handleComment}>
        <TextField type="text" placeholder="comment" name="comment"></TextField>
        <Button type="submit">submit</Button>
      </Stack>
    </Stack>
  );
};

export default Blog;
