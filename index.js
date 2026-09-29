require('dotenv').config()

const express = require('express')   // express is a function
const app = express()                // app is an application object
//So the application object is what .get, .post, and the other http methods exist in.
//So express is a factory function, which creates the application object. 
const morgan = require('morgan')
const Person = require('./models/person')
const cors = require('cors')
app.use(express.static('dist'))


morgan.token('requestBody', (request) => {
  return JSON.stringify(request.body)
})



app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestBody'))

app.get('/', (request, response) => {
    response.send('<h1>Hello-World!</h1>')
})

//I think this is right, it's specifiying person is as the .models/persons which has an export default
//That export default is:  mongoose.model('Person', personSchema)
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})
//So the above coude should find with no specification, all those which match person schema

app.get('/api/info', (request, response) => {
    Person.countDocuments({}).then(quantity => {
        const now = new Date()
        response.send(`<p>Phonebook has info for ${quantity} people</p><p>${now}</p>`)
    })
})



app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if(!person){
            return response.status(404).end()
        }
        response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(() =>
        response.status(204).end()
    )
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const number = request.body.number
    Person.findByIdAndUpdate(request.params.id, { number }, { new: true })
    .then(personUpdated =>
        response.status(200).json(personUpdated)
    )
    .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  }

  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.status(201).json(savedPerson)
  })
})



const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  // check error.name here and respond appropriately
  if(error.name === 'CastError'){
    return response.status(400).json({ error: 'malformed id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})