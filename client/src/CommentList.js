import React from 'react'

function CommentList({ comments }) {
  const commentList = comments.map((comment) => {
    let content
    switch (comment.status) {
      case 'pending':
        content = 'Awaiting Moderation...'
        break
      case 'rejected':
        content = 'Comment has been rejected'
        break
      case 'approved':
        content = comment.content
        break
      default:
        content = comment.content
    }
    return <li key={comment.id}>{content}</li>
  })
  return <ul>{commentList}</ul>
}

export default CommentList
