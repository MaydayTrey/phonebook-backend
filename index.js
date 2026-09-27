const express = require('express')   // express is a function
const app = express()                // app is an application object
//So the application object is what .get, .post, and the other http methods exist in.
//So express is a factory function, which creates the application object. 
const morgan = require('morgan')
const cors = require('cors')
app.use(express.static('dist'))


morgan.token('requestBody', (request, response) => {
  return JSON.stringify(request.body)
})



app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestBody'))



let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateID = () => String(Math.floor(Math.random() * 1000000));

const createPerson = ({name, number}) => {
    return {
        name,
        number,
        id: generateID()
    }
}


app.get('/', (request, response) => {
    response.send('<h1>Hello-World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/info', (request, response) => {
    const quantity = phonebook.length
    const now = new Date()
    response.send(`<p>Phonebook has info for ${quantity} people</p><p>${now}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = phonebook.find(person => person.id === id)
    response.json(person)

})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phonebook = phonebook.filter(person => person.id !== id)

    response.status(204).end() 
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  }

  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }

  if (phonebook.some(entry => entry.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const person = createPerson(body)
  phonebook = phonebook.concat(person)
  response.status(201).json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})