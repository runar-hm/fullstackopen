const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username : 1, fullName : 1})
  return res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {

  const user = await User.findById(req.user.id)
  if (!user) {
    return res.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({...req.body, user: user.id})

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return res.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate('user')

  
  if ( !(req.user.id.toString() === blog.user.id.toString()) ){
    return res.status(401).json({ error: 'User not authorized to delete'})
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id

  const { url, title, likes } = request.body

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).end()
  }

  if (!url || !title){
    return response.status(404).send('Update requires both url and title')
  }

  blog.url = url 
  blog.title = title 
  blog.likes = likes

  const updateResult = await blog.save()

  return response.json(updateResult)

})

module.exports = blogsRouter