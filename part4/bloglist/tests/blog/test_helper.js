const Blog = require('../../models/blog')

const initalUsers = [
{
    _id: '689a06a9dd0dc4cec31eab8a',
    username: 'rodjar',
    fullName: 'runardanjo ranarock',
    pwHash: '$2b$10$iGq4rOqcwCu7JSbJFs37ieApOKx9gQ0YsMXK1htRKNnPLA96cXKNS',
    password: 'fargene'
},
{
    _id: '68a06fb9c0de61994000b55c',
    username: 'ragnar',
    fullName: 'ruduludu hamalama',
    pwHash: '$2b$10$iGq4rOqcwCu7JSbJFs37ieApOKx9gQ0YsMXK1htRKNnPLA96cXKNS',
    password: 'fargene'
}
]

const initalBlogs = [
{
    _id: "68a06fb9c0de61994000b55c",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
    user: '689a06a9dd0dc4cec31eab8a'
},
{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
    user: '68a06fcc483f5386f681a252'
},
{
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
    user:'68a06fcc483f5386f681a252'
},
{
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
    user: '68a06fb9c0de61994000b55c'
},
{
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
    user: '68a06fb9c0de61994000b55c'
},
{
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
    user: '68a06fb9c0de61994000b55c'
}  
]

const singleBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user :'68a06fb9c0de61994000b55c'
}

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initalBlogs,
    initalUsers,
    singleBlog,
    blogsInDB,
}