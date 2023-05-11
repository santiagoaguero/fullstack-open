const blogRouter = require("express").Router()
const Blog = require ("../models/blog")

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body
  try {
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
      })
      
      if(blog.title === undefined && blog.url === undefined){
        response.status(400).end()
      }
      else {
        const savedBlog = await blog.save()
        response.json(savedBlog)
      }
  } catch(ex){
      next(ex)
  }
    
})

module.exports = blogRouter