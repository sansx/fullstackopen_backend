const express = require('express')
const app = express()

var morgan = require('morgan')
morgan('tiny')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "test",
        "number": "2222",
        "id": 5
    },
    {
        "name": "123",
        "number": "222",
        "id": 6
    }
]



app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body
    console.log(req.body, persons.find(e => e.name === name));

    switch (true) {
        case !name:
            return res.status(400).json({
                error: 'name missing'
            })
            break;
        case !number:
            return res.status(400).json({
                error: 'number missing'
            })
            break;
        case !!persons.find(e => e.name === name):
            return res.status(400).json({
                error: 'name must be unique'
            })
            break;
        default:
            break;
    }

    persons.push({
        name,
        number,
        id: Math.random() * 100000
    })
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(e => e.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.filter(e => e.id !== id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    res.send(` <div>Phonebook has info for ${persons.length} people
    <br/><br/>
    ${new Date()}
</div> `)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




