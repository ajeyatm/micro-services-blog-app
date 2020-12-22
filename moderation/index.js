import express from 'express'
import axios from 'axios'

const app = express()
app.use(express.json())

const commentStatus = []

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  if (type === 'CommentCreated') {
    const { id } = data
    const status = data.content.includes('orange') ? 'rejected' : 'approved'
    commentStatus.push({
      id,
      status,
    })
    try {
      console.log('commentStatus___', commentStatus)
      await axios.post('http://localhost:4005/events', {
        type: 'CommentModerated',
        data: {
          ...data,
          status,
        },
      })
    } catch (error) {
      console.log(error)
      res.status(503).send({ error })
    }
  }
  res.send({})
})

app.listen(4003, () => console.log('Moderation Service: Listening on 4003'))
