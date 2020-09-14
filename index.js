const express = require('express')
const app = express()

app.use(express.json())

const persons = {
    "persons": [
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
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(` <div>Phonebook has info for ${persons.persons.length} people
    <br/><br/>
    ${new Date()}
</div> `)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




