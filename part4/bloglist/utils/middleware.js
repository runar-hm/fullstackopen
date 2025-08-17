const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const tokenExtractor = ( req, res, next ) => {
  const auth = req.get('authorization') || '' 

  if (auth.startsWith('Bearer ')){
    req.token = auth.replace('Bearer ', '')
  }

  next()
}

const userExtractor = ( req, res , next ) => {
  if ((req.method !== 'GET')){
    const user = jwt.verify(req.token, process.env.SECRET)
    user.id ? req.user = user : req.user = null
  }

  next ()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).send({ error: 'expected `username` to be unique'})
  } else if (error.name === 'JsonWebTokenError'){
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError'){
    return response.status(401).json({ error: 'token expired'})
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}