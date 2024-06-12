const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  
blogRouter.post('/', (request, response) => {
const blog = new Blog(request.body)

if (!blog.likes) {
    blog.likes = 0
}
if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title or url missing' })
}
    
blog
    .save()
    .then(result => {
    response.status(201).json(result)
    })
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  try {await Blog.findByIdAndDelete(id)
    response.status(204).end()}
  catch (error) {
    response.status(400).end()
  }

})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.json(updatedBlog)
  }
  catch (error) {
    response.status(400).end()
  }
  
})


module.exports = blogRouter