import React, { useState } from 'react'
import axios from 'axios'

function PostCreate() {
  const [title, setTitle] = useState('')
  const url = 'http://localhost:4000/posts'

  const createPost = async (e) => {
    e.preventDefault()
    if (title.length) {
      try {
        let response = await axios.post(url, { title })
        console.log('data', response.data)
        setTitle('')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <form onSubmit={createPost}>
        <div className='form-group'>
          <label>Title</label>
          <input
            className='form-control'
            type='text'
            placeholder='Enter post title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button
          className='btn btn-primary'
          type='submit'
          disabled={title.length < 1}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default PostCreate
