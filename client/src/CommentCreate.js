import React, { useState } from 'react'
import axios from 'axios'

function CommentCreate({ postId }) {
  const [content, setContent] = useState('')
  const url = 'http://localhost:4001/posts'

  const createComment = async (e) => {
    e.preventDefault()
    if (content.length) {
      try {
        let res = await axios.post(`${url}/${postId}/comments`, {
          content,
        })
        console.log('data', res.data)
        setContent('')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <form onSubmit={createComment}>
        <div className='form-group'>
          <label>New Comment</label>
          <input
            className='form-control'
            type='text'
            placeholder='Enter comments'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button
          className='btn btn-primary'
          type='submit'
          disabled={content.length < 1}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default CommentCreate
