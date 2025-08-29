import { useState } from 'react';
import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogReducer';

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
        setNotification(`Blog posted with title ${newBlog.title}`, 5, 'info')
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
        <div>
          title:
          <input
            placeholder="title"
            type="text"
            name="title"
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          ></input>
        </div>
        <div>
          author:
          <input
            placeholder="author"
            type="text"
            name="author"
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          ></input>
        </div>
        <div>
          url:
          <input
            placeholder="url"
            type="text"
            name="author"
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          ></input>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
