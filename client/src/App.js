import './App.css'
import PostList from './PostList'
import PostCreate from './PostCreate'

function App() {
  return (
    <div className='container'>
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  )
}

export default App
