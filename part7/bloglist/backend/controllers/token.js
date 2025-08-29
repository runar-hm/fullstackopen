const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const auth = request.get('authorization')
    if (auth && auth.startsWith('Bearer ')){
        return auth.replace('Bearer ', '')
    }
}

const decodeTokenFrom = request => {
    const token = getTokenFrom(request)
    const decoded = jwt.verify(token,process.env.SECRET)
    if (!decoded.id) return null

    return decoded
}

module.exports = {
    decodeTokenFrom 
}