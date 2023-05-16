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

test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/,
        100000)//Este tercer parámetro establece el tiempo de espera en 100.000 ms. Es posible que un tiempo de espera prolongado no sea lo que se desea para pruebas de rendimiento o la velocidad, pero está bien para nuestras pruebas de ejemplo.
  })

test("empty db", async() =>{
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(0)

})

test("returned all blogs", async () => {

    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("check 'id' prop exists",//we transform the "_id" Mdb identifier to "id" in the schema
    async () => {
      const response = await api.get('/api/blogs');
      response.body.forEach((blog) => {
        expect(blog.id).toBeDefined();//toBeDefined returns all values except undefined ones
      });
    }
)

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

afterAll(() => {
    mongoose.connection.close();
  });