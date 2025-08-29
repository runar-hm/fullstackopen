const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    if (!blogs || blogs.length === 0) {
        return 0
    }

    return blogs.reduce( ( sum, blog ) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
    if (!blogs || blogs.length === 0){
        return null
    }

    let favBlog =  null

    blogs.forEach( ( blog ) => {
        if (favBlog === null || favBlog.likes < blog.likes) {
            favBlog = blog
        }
    })

    return (favBlog.likes ===0)
    ? null
    :favBlog
    }

const mostBlogs = blogs => {
    if (!blogs || blogs.length === 0){
        return null
    }

    // Count entries per author, and find max countn value. 
    const authorCount = _.countBy(blogs, 'author')
    const maxCount = _.maxBy(Object.values(authorCount))

    // In authorCount {'Jon':2,'Yon':4}, find name entry where value === maxCount
    const [maxAuthor , __] = Object.entries(authorCount).find(
        ([author, count]) => count === maxCount
    )

    return {
        'author':maxAuthor,
        'blogs':maxCount
    }
}

const mostLikes = blogs => {
    if (!blogs || blogs.length === 0){
        return null
    }

    const output = blogs.reduce((authors, info) => {
        const likes = authors[info.author] ? info.likes + authors[info.author] : info.likes

        authors[info.author] = likes

        return authors

    }, {})

    //  console.log(blogs)

    console.log('output',output)

    const maxLikes = _.max(Object.values(output))

    const [ maxAuthor, __ ] = Object.entries(output).find(
        ( [author, likes] ) => likes === maxLikes 
    )

    console.log('max', maxLikes)

    return {
        'author':maxAuthor,
        'likes':maxLikes
    }

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}