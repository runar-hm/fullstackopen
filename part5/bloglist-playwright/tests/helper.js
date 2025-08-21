
const initUsers = [
    {
        username:"testythai",
        password:"testiano",
        fullName:"Testiano Ronaldo",
        _id: "689a06a9dd0dc4cec31eab8a"
    },
    {
    username:"testo",
    password:"testos",
    fullName:"Testosterona Regoldino",
    _id: "5a422ba71b54a676234d17fb"
    }
    ]

const initBlogPosts = [
    {
    title:"testing title",
    author:"Test Testson",
    url: "vg.no",
    likes:5,
    user:"689a06a9dd0dc4cec31eab8a"
    },
    {
    title:"Testo Title",
    author:"Newton",
    url: "vg.no",
    likes:2,
    user:"5a422ba71b54a676234d17fb"
    }
    ] 

const loginWith = async ( page, username, pw ) => {
    await page.getByPlaceholder('username').fill(username)
    await page.getByPlaceholder('password').fill(pw)
    await page.getByRole('button', {name: 'login'}).click()    
}

const addBlog = async ( page, blog ) => {
    await page.getByRole('button', {name:'Add new blog'}).click()
    await page.getByPlaceholder('title').fill(blog.title)
    await page.getByPlaceholder('author').fill(blog.author)
    await page.getByPlaceholder('url').fill(blog.url)

    await page.getByRole('button', { name: 'submit' }).click();
}

export { initUsers, initBlogPosts, loginWith, addBlog }