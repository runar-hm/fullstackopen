require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')

const { MONGODB_URI } = require('./utils/config')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

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
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test'){
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app

