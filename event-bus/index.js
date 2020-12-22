import express from 'express'
import axios from 'axios'

const app = express()
app.use(express.json())

const events = []

app.post('/events', (req, res) => {
  const event = req.body
  events.push(event)
  try {
    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event)
    axios.post('http://localhost:4003/events', event)

    res.send({ Status: 'OK' })
  } catch (error) {
    console.log(error)
    res.status(503).send({ error })
  }
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(4005, () => {
  console.log('Event-Bus Listening on port 4005: http://localhost:4005')
})
