import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [msg, setMsg] = useState()
  const [msgType, setMsgType] = useState('info')

  const blogFormRef = useRef()

  useEffect(() => {
    const raw = window.localStorage.getItem('loggedBlogUser')
    if (raw) {
      const parsed = JSON.parse(raw)
      setUser(parsed)
      blogService.setToken(parsed.token)
    } else {
      blogService.setToken(null)
    }
  }, [])
  
  useEffect(() => {
    if (user){
    blogService
      .getAll()
      .then(initBlogs =>
        setBlogs( initBlogs )
      )}
  }, [user])


  const addBlog = async (newBlog) => {
    console.log('adding new blog', newBlog)
    try {
      const response = await blogService.create(newBlog)
      setBlogs([...blogs, response])
      setMsg(`Blog posted with title ${response.title}`)
      blogFormRef.current.toggleVisibility()

    } catch (exception) {
      console.log(exception)
      setMsgType('error')
      setMsg('Something went wrong. Blog not posted.')
    }

  }

  const updateBlog = async (amendBlog) => {
    console.log('Updating blog with', amendBlog)
    try{
      const res = await blogService.update(amendBlog)
      res.user = amendBlog.user
      setBlogs(blogs.map(blog => blog.id === amendBlog.id ? amendBlog : blog ))

    } catch (exception) {
      console.log(exception)
      setMsgType('error')
      setMsg('Something went wrong. Blog not updated.')
    }
  }

  const deleteBlog = async (deleteBlog) => {
    if (window.confirm(`Do you want to delete ${deleteBlog.title}`)){
      try{
        blogService.remove(deleteBlog)
        setBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))
        setMsg(`Blog "${deleteBlog.title}" deleted.`)
      } catch (exception) {
        console.log(exception)
        setMsgType('error')
        setMsg('Could not delete', deleteBlog.title)
      }
    }
  }

  const handleLogin = async (event) => {

    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser',JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log('error', exception)
      setMsgType('error')
      setMsg('wrong username or password')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken(null)
    setUser()
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          placeholder='username'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)
          }></input>
      </div>
      <div>
        password
        <input
          type='password'
          placeholder='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}>
        </input>

        <button type='submit'>login</button>
      </div>
    </form>
  )

  const blogArray = () => {
    const sorted = blogs.sort((a,b) => b.likes - a.likes)


    return(
      sorted.map(blog => {
        const userCreated = (blog.user.username === user.username) ? true : false
        return(
          <Blog key={blog.id} blog={blog} incrementLike={updateBlog} removeBlog={deleteBlog} userCreated={userCreated}/>
        )
      })
    )
  }

  if (!user ){
    return (
      <div>
        <h2>Log in</h2>
        <Notification msg={msg} type={msgType}/>
        {loginForm()}

      </div>
    )
  }
  return (
    <div>
      <h2>Blogs App</h2>
      <Notification msg={msg} type={msgType}/>
      <div>
        <p>Logged in as: {user.username} </p>
        <button onClick={handleLogout}>log out</button>
      </div>

      <div>
      Blog
        <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </div>

      <h3>Blogs</h3>
      {blogArray()}
    </div>
  )
}

export default App