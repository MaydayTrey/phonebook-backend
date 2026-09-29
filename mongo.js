//POSTing to MongoDB Atlas:

/* const mongoose = require('mongoose')
const password = process.argv[2]
const url = 
`mongodb+srv://sunwaver25_db_user:${password}@cluster0.v0r2wup.mongodb.net/phonebook?appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

//Password length check
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
} else if(process.argv.length === 3){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else{
    //This is an entry
    const name = process.argv[3]
    const number = process.argv[4]
    const phonebookEntry = new Person({
        name,
        number
    })
    phonebookEntry.save().then(result => {
        console.log(`Entry saved as ${name} with the number ${number}`)
        mongoose.connection.close()
        }
    )
}

*/