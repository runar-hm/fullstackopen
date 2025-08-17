const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')

const helper = require('./test_helper')

const Blog = require('../../models/blog')
const User = require('../../models/user')

const app = require('../../app')
const supertest = require('supertest')

const _ = require('lodash')

const api = supertest(app)

const loginCred = {
    username: helper.initalUsers[0].username,
    password: helper.initalUsers[0].password
}

const loginCredFromId = id => {

    const user = helper.initalUsers.find(user => user._id === id)
    return {
        username: user.username,
        password: user.password
    }
}

const loginToken = async (loginCred) => {
    const login = await api
        .post('/api/login')
        .send(loginCred)
        .expect(200)
            
    return 'Bearer ' + login.body.token
}

describe('when there are blogs saved initially', () => {
    beforeEach( async () => {
        await User.deleteMany({})
        await User.insertMany(helper.initalUsers)

        await Blog.deleteMany({})
        await Blog.insertMany(helper.initalBlogs)
    })

    describe('fetching blogs', () => {
        test('GET /api/blogs responds with application/json', async () => {
            const result = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type',/application\/json/)
        })

        test('GET /api/blogs returns correct amount of blogpost', async () => {
            const result = await api.get('/api/blogs')
            assert.strictEqual(result.body.length, helper.initalBlogs.length)
        })

        test('GET /api/blogs blogs returned has key "id"', async () => {
            const result = await api.get('/api/blogs')
            assert.ok((Object.keys(result.body[0])).includes('id'))
        })

    })

    describe('adding a new blogs', () => {
        test('POST /api/blogs increases blog count', async () => {
            const token = await loginToken(loginCred)
        
            await api
                .post('/api/blogs')
                .set('Authorization', token)
                .send(helper.singleBlog)
                .expect(201)
            
            const blogsAfter = await helper.blogsInDB()

            assert.equal(helper.initalBlogs.length +1, blogsAfter.length)
        })

        test('POST /api/blogs defaults likes to 0 when no likes provided', async () => {
            const token = await loginToken(loginCred)
            
            const blogNoLikes = _.omit(helper.singleBlog,'likes')
            const result = await api.post('/api/blogs').set('Authorization', token).send(blogNoLikes)

            assert.equal(result.body.likes, 0)
        })

        test('POST /api/blogs returns 400 bad request when no URL in body', async () => {
            const token = await loginToken(loginCred)

            const blogNoUrl = _.omit(helper.singleBlog,'url')

            await api
                .post('/api/blogs')
                .send(blogNoUrl)
                .set('Authorization', token)
                .expect(400)
                
        })

        test('POST /api/blogs returns 400 bad request when no title in body', async () => {
            const token = await loginToken(loginCred)

            const blogNoTitle = _.omit(helper.singleBlog, 'title')

            await api
                .post('/api/blogs')
                .set('Authorization', token)
                .send(blogNoTitle)
                .expect(400)
        })
    })

    describe('Deleting blog', () => {
        test('DELETE /api/blog/:id succeeds with 204 if valid id', async () => {
            const blogsAtStart = await helper.blogsInDB()

            const blogToDelete = blogsAtStart[0]

            const token = await loginToken(loginCred)

            await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', token).expect(204)

            const blogsAtEnd = await helper.blogsInDB()

            assert.equal(blogsAtEnd.length, blogsAtStart.length -1)
        })
    })

    describe('Updating blogs', () => {

        test('PUT /api/blogs/:id with Non-existing ID', async () => {
            const token = await loginToken(loginCred)
            id = '68a06fb9c0de61994000b55c'
            await api
                .put(`/api/blogs/${id}`)
                .set('Authorization', token)
                .expect(404)

        })

        test('PUT /api/blogs/:id with existing ID, changing URL and Title', async () => {
            const initalBlogs = await helper.blogsInDB()

            const blogToChange = initalBlogs[0]

            const userCred = loginCredFromId(blogToChange.user.toString())            
            const token = await loginToken(userCred)

            const body = {
                title: 'Changed title',
                url: 'Changed URL',
                likes: 600
            }

            result = await api.put(`/api/blogs/${blogToChange.id}`).set('Authorization', token).send(body)

            assert.strictEqual(result.body.title, body.title)
            assert.strictEqual(result.body.url, body.url)
            assert.strictEqual(result.body.likes, body.likes)

        })
    })
})


after( async () => {
    await mongoose.connection.close()
})