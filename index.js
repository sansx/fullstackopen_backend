require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

var morgan = require('morgan')
morgan('tiny')

app.use(express.static('build'))

morgan.token('body', function (req) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const Persons = require('./models/persons')

app.get('/api/persons', (req, res) => {
  Persons.find({}).then(persons => {
    res.json(persons)
  })
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  switch (true) {
  case !name:
    return res.status(400).json({
      error: 'name missing'
    })
  case !number:
    return res.status(400).json({
      error: 'number missing'
    })
  default:
    break
  }

  new Persons({
    name,
    number
  }).save()
    .then(e => res.json(e)).catch(error => next(error))

})

app.get('/api/persons/:id', (req, res, next) => {
  Persons.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))

})

app.delete('/api/persons/:id', (req, res, next) => {
  Persons.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  Persons.findByIdAndUpdate(req.params.id, { name, number }, { new: true, runValidators: true }).then(person => {
    res.json(person)
  }).catch(error => next(error))
})

app.get('/info', (req, res) => {
  Persons.find({}).then(persons => {
    res.send(` <div>Phonebook has info for ${persons.length} people
    <br/><br/>
    ${new Date()}
</div> `)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id!!' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})




