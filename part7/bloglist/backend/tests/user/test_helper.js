const mongoose = require('mongoose')
const User = require('../../models/user')

const initalUsers = [
  {
    "username": "roddjar",
    "fullName": "Runardinjo Ragnarocknroll",
    "password": "kasndasdaed"
  },
  {
    "username": "rimar",
    "fullName": "rimar ravnenberger",
    "password": "knallegodegardinger"
  },
  {
    "username": "yohoo",
    "fullName": "Yohan Barnevandrer",
    "password": "aingnrearijnaf"
  }
]

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initalUsers,
    usersInDB
}