const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')

const helper = require('./test_helper')

const Blog = require('../models/blog')

const app = require('../app')
const supertest = require('supertest')
const { application } = require('express')

const _ = require('lodash')

const api = supertest(app)
 
describe('when there are blogs saved initially', () => {
    beforeEach( async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initalBlogs)
    })

    describe('fetching notes', () => {
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
            await api
                .post('/api/blogs')
                .send(helper.singleBlog)
                .expect(201)
            
            const blogsAfter = await helper.blogsInDB()

            assert.equal(helper.initalBlogs.length +1, blogsAfter.length)
        })

        test('POST /api/blogs defaults likes to 0 when no likes provided', async () => {
            const blogNoLikes = _.omit(helper.singleBlog,'likes')
            const result = await api.post('/api/blogs').send(blogNoLikes)

            assert.equal(result.body.likes, 0)
        })

        test('POST /api/blogs returns 400 bad request when no URL in body', async () => {
            const blogNoUrl = _.omit(helper.singleBlog,'url')

            await api
                .post('/api/blogs')
                .send(blogNoUrl)
                .expect(400)
        })

        test('POST /api/blogs returns 400 bad request when no title in body', async () => {
            const blogNoTitle = _.omit(helper.singleBlog, 'title')

            await api
                .post('/api/blogs')
                .send(blogNoTitle)
                .expect(400)
        })
    })

    describe('Deleting note', () => {
        test('DELETE /api/blog/:id succeeds with 204 if valid id', async () => {
            const blogsAtStart = await helper.blogsInDB()

            const blogToDelete = blogsAtStart[0]

            await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

            const blogsAtEnd = await helper.blogsInDB()

            assert.equal(blogsAtEnd.length, blogsAtStart.length -1)
        })
    })

    describe.only('Updating notes',  () => {

        test('PUT /api/blogs/:id with Non-existing ID', async () => {
            
            const id = '6891f1f727fedb7e3eb4b5a1'
            await api.put(`/api/blogs/${id}`).expect(404)
        })

        test('PUT /api/blogs/:id with existing ID, changing URL and Title', async () => {
            const initalBlogs = await helper.blogsInDB()

            const blogToChange = initalBlogs[0]

            const body = {
                title: 'Changed title',
                url: 'Changed URL',
                likes: 600
            }

            result = await api.put(`/api/blogs/${blogToChange.id}`).send(body)

            

            assert.strictEqual(result.body.title, body.title)
            assert.strictEqual(result.body.url, body.url)
            assert.strictEqual(result.body.likes, body.likes)

        })
    })
})


after( async () => {
    await mongoose.connection.close()
})