const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://happyboy:${password}@cluster0.lss4u.mongodb.net/${"phonebook"}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phonebook = new mongoose.Schema({
  name: String,
  number: Number
})

const Persons = mongoose.model('Persons', phonebook)

if (name && number) {
  const person = new Persons({
    name,
    number
  })

  person.save().then(result => {
    console.log(` added ${name} number ${number} to phonebook    `)
    mongoose.connection.close()
  })
} else {
  Persons.find({}).then(
    result => {
      result.forEach(note => {
        console.log(note)
      })
      mongoose.connection.close()
    }
  )


}




