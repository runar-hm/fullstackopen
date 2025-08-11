const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
  .catch((error) => next(error))
})

blogsRouter.post('/', (request, response, next) => {

  const blog = new Blog(request.body)

  blog
    .save()
    .then((result) => {
    response.status(201).json(result)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
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