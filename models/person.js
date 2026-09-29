const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI // I need to make this! 

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB:', error.message)
    })


//Creates the person Schema
const personSchema = new mongoose.Schema({
  name: {
    // options for the name field go here
    type: String,
    minLength: 3
  },
  number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

