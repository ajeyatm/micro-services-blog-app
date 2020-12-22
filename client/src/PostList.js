import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

function PostList() {
  const [posts, setPosts] = useState({})
  const url = 'http://localhost:4002/posts'

  const fetchPosts = async () => {
    try {
      let response = await axios.get(url)
      setPosts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const postList = Object.values(posts).map((post) => (
    <div
      className='card'
      style={{ width: '30%', marginBottom: '20px' }}
      key={post.id}
    >
      <div className='card-body'>
        <h4>{post.title}</h4>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  ))
  console.log(postList)
  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {postList}
    </div>
  )
}

export default PostList
