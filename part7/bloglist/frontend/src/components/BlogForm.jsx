import { useState } from 'react';
import { setNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogReducer';

import { TextField, Button } from '@mui/material';

const BlogForm = ({ blogFormRef }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const dispatch = useDispatch();

  const submitBlog = async (newBlog) => {
    console.log('adding new blog', newBlog);
    try {
      dispatch(addBlog(newBlog));
      dispatch(
        setNotification(`Blog posted with title ${newBlog.title}`, 5, 'success')
      );
      //  blogFormRef.current.toggleVisibility();
    } catch (exception) {
      console.log(exception);
      dispatch(
        setNotification('Something went wrong. Blog not posted', 5, 'error')
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="title"
          type="text"
          name="title"
          label="title"
          value={newBlog.title}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        ></TextField>
        <TextField
          placeholder="author"
          type="text"
          label="author"
          name="author"
          value={newBlog.author}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        ></TextField>

        <TextField
          placeholder="url"
          type="text"
          label="url"
          name="author"
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        ></TextField>

        <Button type="submit" variant="contained" color="primary">
          submit
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
