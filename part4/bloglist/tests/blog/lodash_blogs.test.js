const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../../utils/list_helper')

const manyBlogs = [
{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
},
{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
},
{
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
},
{
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
},
{
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
},
{
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
}  
]

test('dummy returns 1', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result,1)
})

describe('Sum of likes from blog array', () => {
    test('no blog post returns 0', () => {
        const blogs = []
        const result = listHelper.totalLikes(blogs)

        assert.strictEqual(result, 0)
    })
    
    test('single blog post', () => {
        const blogs = [
            {"title":"String","author":"String","url":"String","likes":2,"id":"68937d67aa82fa7abb8385b9"},
        ]

        const result = listHelper.totalLikes(blogs)

        assert.strictEqual(result, 2)
    },)

    test('four blog posts', () => {

    const result = listHelper.totalLikes(manyBlogs)

    assert.strictEqual(result,36)
    })
})

describe('Picking blog with most likes from array of blogs', () => {

    test('When blog array is empty ', () => {
        blogs = []

        const result = listHelper.favoriteBlog(blogs)

        assert.strictEqual(result,null)
    })

    test('Array with no likes on any blog', () => {
        const blogs = [
            {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 0,
                __v: 0
            },
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                likes: 0,
                __v: 0
            },
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 0,
                __v: 0
            },
            {
                _id: "5a422b891b54a676234d17fa",
                title: "First class tests",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
                likes: 0,
                __v: 0
            },
            {
                _id: "5a422ba71b54a676234d17fb",
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 0,
                __v: 0
            },
            {
                _id: "5a422bc61b54a676234d17fc",
                title: "Type wars",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
                likes: 0,
                __v: 0
            }  
        ]

        const result = listHelper.favoriteBlog(blogs)
        
        assert.deepEqual(result,null)
    })

    test('When many blogs', () => {
        
        const desiredResult =   {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }

        const result = listHelper.favoriteBlog(manyBlogs)

        assert.deepEqual(result,desiredResult)
    })
})


describe('Get author with most blog posts', () => {
    test('Empty array', () => {
        blogs = []
        const result = listHelper.mostBlogs(blogs)
        assert.strictEqual(result,null)
    })

    test('Many blogs', () => {

        desiredResult = {'author':'Robert C. Martin','blogs':3}

        const result = listHelper.mostBlogs(manyBlogs)

        assert.deepEqual(result, desiredResult)
    })
})

describe('Author with most likes', () => {
    test('Empty array', () => {
        blogs = []
        const result = listHelper.mostLikes(blogs)
        assert.strictEqual(result,null)
    })  

    test('Many blogs', () => {

        const desiredResult = {'author':'Edsger W. Dijkstra','likes':17}

        const result = listHelper.mostLikes(manyBlogs)

        assert.deepEqual(result,desiredResult)
    })
})