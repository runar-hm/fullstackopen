require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const { PORT, MONGODB_URI } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')


const app = express()

logger.info('Connecting to Mongo DB')
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        logger.info('Connected to Mongo DB')
    })
    .catch(error => {
        logger.error(`Error connecting Mongo DB ${error}`)
    })


app.use(express.static('.dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app

