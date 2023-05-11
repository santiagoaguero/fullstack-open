const Blog = require('../models/blog');


const initialBlogs = [
    {   title: "el mas loco de todos los tiempos",
        author: "Boris Chel",
        url: "www.boris-loco.com",
        likes: 7},
    {   title: "Dejenme dormir loco",
        author: "Rufo Luis",
        url: "bloggers.com/rufo",
        likes: 3}
]


const dummy = (blogs) =>{
    if (blogs.length === 0){
        return 1
    }
}


const totalLikes = (blogs) =>
     blogs.reduce(
        (accumulator, currentValue) => 
        accumulator + currentValue.likes, 0//start sum with 0
      )

const favoriteBlog = (blogs) => {
    const likes = blogs.map(x => x.likes)
    const maxLikes = Math.max(...likes)
    const indexMax = likes.indexOf(maxLikes)

    return blogs[indexMax]

}


const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};


module.exports = {dummy, totalLikes, favoriteBlog, blogsInDb, initialBlogs}
