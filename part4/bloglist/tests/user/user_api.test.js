const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')

const User = require('../../models/user')

const app = require('../../app')
const supertest = require('supertest')

const api = supertest(app)

const helper = require('./test_helper')

describe('When db has users initially', async () => {
    beforeEach( async () => {
        await User.deleteMany({})
        await User.insertMany(helper.initalUsers)
    })

    test('POST /api/users does not accept duplicate usernames', async () => {

        const usersInDB = await helper.usersInDB()

        const newUser = {
            username:usersInDB[0].username,
            fullName:"testington",
            password:"testington"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        assert.equal(result._body.error,'expected `username` to be unique')
    })

    test('')

})

after( async () => {
    await mongoose.connection.close()
})