const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("../utils/list_helper")
const app = require("../app")

const api = supertest(app)
const Blog = require("../models/blog")


beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => 
        new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

describe("when there is initially some blogs saved", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/,
          100000)//Este tercer parámetro establece el tiempo de espera en 100.000 ms. Es posible que un tiempo de espera prolongado no sea lo que se desea para pruebas de rendimiento o la velocidad, pero está bien para nuestras pruebas de ejemplo.
    })
    // test("empty db", async() =>{
    //   const response = await api.get("/api/blogs")
    //   expect(response.body).toHaveLength(0)
  
    // })
    test("returned all blogs", async () => {
      const response = await api.get("/api/blogs")
      expect(response.body).toHaveLength(helper.initialBlogs.length)
   })
})


describe("check existing props", () => {
  test("check 'id' prop exists",//we transform the "_id" Mdb identifier to "id" in the schema
    async () => {
      const response = await api.get('/api/blogs');
      response.body.forEach((blog) => {
        expect(blog.id).toBeDefined();//toBeDefined returns all values except undefined ones
      });
    })
    test("check title & url props exist", async () =>{
      const badFormattedBlog = {
          author: "Coolio",
          likes: 3
      }
    await api
      .post('/api/blogs')
      .send(badFormattedBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  test("check likes prop exists", async () =>{
    const blogWithoutLikes = {
        title: "A veces me quiero, a veces no",
        author: "Maria",
        url: "maria-lavecina.org/poems"
    }
    if (blogWithoutLikes.likes === undefined){
        const blogWithLlikes = {...blogWithoutLikes, likes: 0}
        const savedBlog = await api
            .post("/api/blogs")
            .send(blogWithLlikes)
            .expect(200)
            .expect("Content-Type", /application\/json/)
        expect(savedBlog.body.likes).toBe(0)
    }
  })
})


describe("addition of a blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
        title: "Le cochito le mamà",
        author: "Lionel Michi",
        url: "michi-posts.com/post",
        likes: 5
    }
  
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(x => x.title)
    expect(contents).toContain(
      "Le cochito le mamà"
    )
  })
})


describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)


    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})


describe("updating a blog", () => {
  test("succeeds updating a valid blog", async ()=>{
    const initialBlogs = await helper.blogsInDb()
    const updateBlog = initialBlogs[0]

    const newLikes = {
      likes: 21
  }

  await api
    .put(`/api/blogs/${updateBlog.id}`)
    .send(newLikes)
    .expect(200)
    .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
    mongoose.connection.close();
  });