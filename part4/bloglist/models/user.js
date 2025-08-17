const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLenght: 16,
        minLenght: 6,
        trim: true,
        unique: true
    },
    pwHash:String,
    fullName: {
        type: String,
        required: true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        // Return _id as id
        returnedObject.id = returnedObject._id.toString()
        
        // Do not reveal pwhash.
        delete returnedObject.pwHash
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', userSchema)