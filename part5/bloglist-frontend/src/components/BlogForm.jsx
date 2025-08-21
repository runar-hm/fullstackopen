import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title:'',
    author:'',
    url:''
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      title:'',
      author:'',
      url:''
    })
  }

  return(
    <div>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input placeholder='title' type='text' name='title' value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}></input>
        </div>
        <div>
            author:
          <input placeholder='author' type='text' name='author' value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}></input>
        </div>
        <div>
            url:
          <input placeholder='url' type='text' name='author' value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}></input>
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )}

export default BlogForm