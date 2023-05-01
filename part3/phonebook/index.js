require('dotenv').config()//always b4 load models
const Person = require("./models/person")
const express = require("express")
const morgan = require('morgan')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.static('dist'))//static files/compiled files(HTML & JS)
app.use(express.json())


// let persons = [
///...
//   ]



  morgan.token("person", (req, res) => {
    if (req.method === "POST") return JSON.stringify(req.body);
    return null;
  });
  
  app.use(morgan(":method :url :status :res[content-length] - :response-time ms :person"));

  app.get("/", (req,res)=>{
    res.send("hola")
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    console.log("que")
    response.json(notes)
  })
})

app.get("/info", (req,res)=>{
    const time = new Date()
    res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${time}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(x => x.id !== id)
    res.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
    }
  
    const person = new Person({
      name: body.name,
      number: body.number
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })


  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)




  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })