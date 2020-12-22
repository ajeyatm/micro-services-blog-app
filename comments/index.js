import express from 'express'
import axios from 'axios'
import cors from 'cors'
import { randomBytes } from 'crypto'

const app = express()

app.use(express.json())
app.use(cors())

const commentsByPostId = {}

app.get('/', (req, res) => {
  res.send('Comments service is running')
})

app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id
  const comments = commentsByPostId[postId] || []
  res.send(comments)
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const postId = req.params.id

  const { content } = req.body

  const comments = commentsByPostId[postId] || []

  comments.push({ id: commentId, content, status: 'pending' })

  commentsByPostId[postId] = comments

  try {
    await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        postId,
        status: 'pending',
      },
    })

    res.status(201).send(comments)
  } catch (error) {
    console.log(error)
    res.status(503).send({ error })
  }
})

app.post('/events', async (req, res) => {
  console.log('Event Received:', req.body.type)
  const { type, data } = req.body
  if (type === 'CommentModerated') {
    const { id, postId, status } = data
    const comment = commentsByPostId[postId].find((comm) => comm.id === id)
    comment.status = status
    console.log(comment)
    try {
      await axios.post('http://localhost:4005/events', {
        type: 'CommentUpdated',
        data: {
          ...comment,
          postId,
        },
      })
    } catch (error) {
      console.log(error)
      res.status(503).send({ error })
    }
  }
  res.send({})
})

app.listen(4001, () => {
  console.log('Comments: Listening on http://localhost:4001')
})
