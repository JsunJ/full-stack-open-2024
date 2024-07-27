import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h3>Create a new blog</h3>

      <form onSubmit={addBlog}>
        <div>title: <input
          value={newTitle}
          placeholder='title'
          onChange={event => setNewTitle(event.target.value)}
          data-testid='form-title' /></div>
        <div>author:<input
          value={newAuthor}
          placeholder='author'
          onChange={event => setNewAuthor(event.target.value)}
          data-testid='form-author' /></div>
        <div>url: <input
          value={newUrl}
          placeholder='url'
          onChange={event => setNewUrl(event.target.value)}
          data-testid='form-url' /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm