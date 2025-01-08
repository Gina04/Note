const http = require('http');
const repl = require('node:repl');
const cors = require('cors'); // Importar cors

const express = require('express');
const app = express()



app.use(cors()); // Habilitar CORS para todas las solicitudes
app.use(express.json())


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })

  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => note.id === id)
    console.log(note)
    if(note){
      response.json(note)
    }else{
      response.status(404).end()
    }
    
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
  })

 const generateId =()=>{
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n=>n.id))
    : 0
    const note = request.body
    return maxId + 1

 }

  app.post('/api/notes', (request, response) =>{
    const body = request.body

    if(!body.content){
      return response.status(400).json({
        error: 'content missing'
      })
    }

    const note={
      content: body.content,
      importan: Boolean(body.important) || false, 
      id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
  
  })


app.use(unknownEndpoint)
const PORT = 3002
app.listen(PORT)
console.log(`Server running on port ${PORT}`)