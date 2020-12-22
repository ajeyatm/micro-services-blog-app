import express from 'express'
import axios from 'axios'
import cors from 'cors'
import { randomBytes } from 'crypto'

const app = express()

app.use(express.json())
app.use(cors())

const posts = {}

app.get('/', (req, res) => {
  res.send('Posts service is running')
})

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body
  posts[id] = { id, title }

  try {
    await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: { id, title },
    })

    res.status(201).send(posts[id])
  } catch (error) {
    console.log(error)
    res.status(503).send({ error })
  }
})

app.post('/events', (req, res) => {
  console.log('Event Received::', req.body.type)
  res.send({})
})

app.listen(4000, () => {
  console.log('Posts: Listening on http://localhost:4000')
})
