import { useState } from 'react';
import { useSetNotification } from '../reducers/notificationContext';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import blogService from '../services/blogs';

const BlogForm = ({ blogFormRef }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const queryClient = useQueryClient();

  const addMutation = useMutation({ mutationFn: blogService.create });
  const setNotification = useSetNotification();

  const submitBlog = (newBlog) => {
    addMutation.mutate(newBlog, {
      onSuccess: (res) => {
        setNotification(`Youve added blog ${newBlog.title}`, 5, 'info');
        queryClient.setQueryData(['blogs'], (state) => state.concat(res));
        blogFormRef.current.toggleVisibility();
      },
      onError: (e) => {
        console.log('Error adding blog. Msg: ', error);
        setNotification(`Error. Blog not added`, 5, 'error');
      },
    });
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
