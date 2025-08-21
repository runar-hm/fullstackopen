import { useState } from 'react'

const Blog = ({ blog, incrementLike, removeBlog, userCreated }) => {
  const [expand, setExpand] = useState(false)

  const toggleExpand = () => {
    setExpand(!expand)
  }

  const likeBlog = () => {
    blog.likes++
    incrementLike(blog)
  }

  const remove = () => {
    removeBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogHeader = (
    <p className='blogHeader'> {blog.title} - {blog.author} </p>
  )

  const expandedBlog = (
    <>
      {blogHeader}
      <p className='blogUrl'>{ blog.url }</p>
      <div className='blogLikes'>{ blog.likes }<button onClick={likeBlog}>like</button></div>
      <p className='userFullName'> { blog.user.fullName }</p>
      <button id='expandBtn' onClick={toggleExpand}>hide</button>
      {userCreated && <button onClick={remove}>delete</button>}
    </>
  )

  const contractedBlog = (
    <>
      {blogHeader}
      <button onClick={toggleExpand}>expand</button>
    </>
  )

  return(
    <div style={blogStyle}>
      {expand && expandedBlog}
      {!expand && contractedBlog}
    </div>
  )

}

export default Blog