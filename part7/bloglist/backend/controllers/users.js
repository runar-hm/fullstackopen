const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    return res.json(users || [])
})

usersRouter.post('/', async (req, res) => {
    const { username, fullName, password } = req.body 

    const pwValidtor = (pw) => {
        minLenght = 6
        // add more validation later :-) 

        return true ? (pw.length >= minLenght) : false
    }

    if (!pwValidtor(password)){
        console.log(pwValidtor(password))
        return res.status(404).json('password sucks')
    }

    const saltRounds = 10
    const pwHash = await bcrypt.hash(password, saltRounds)
    
    const user = new User({
        username: username,
        fullName: fullName,
        pwHash: pwHash
    })

    const savedUser = await user.save()

    return res.status(201).json(savedUser)

})

module.exports = usersRouter