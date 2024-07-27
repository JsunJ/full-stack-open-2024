import { useState } from 'react'

const Blog = ({ blog, like, remove, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const detailStyle = {
    margin: 0,
  }

  if (detailsVisible) {
    return (
      <div style={blogStyle} className='blog'>
        {blog.title} by {blog.author} <button onClick={() => setDetailsVisible(!detailsVisible)}>hide</button>
        <p style={detailStyle} className='blog-url'>{blog.url}</p>
        <p style={detailStyle} className='blog-likes'>likes {blog.likes} <button onClick={like}>like</button></p>
        <p style={detailStyle}>{blog.user.name}</p>
        {user === blog.user.username && <button onClick={remove}>remove</button>}
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} by {blog.author} <button className='details-btn' onClick={() => setDetailsVisible(!detailsVisible)}>view</button>
    </div>
  )
}

export default Blog