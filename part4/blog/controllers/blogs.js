const blogRouter = require("express").Router()
const Blog = require ("../models/blog")

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
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

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put("/:id", async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
})

module.exports = blogRouter