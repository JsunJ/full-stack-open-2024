import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => a - b)
      setBlogs(blogs)
    })()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(`Added ${returnedBlog.title}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
    }
  }

  const likeBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }

    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      setSuccessMessage(`Liked ${returnedBlog.title}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
    }
  }

  const removeBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const confirmation = confirm(`Remove blog ${blog.title} by ${blog.author} ?`)

    if (confirmation) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setSuccessMessage(`Deleted ${blog.title}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } catch (error) {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 10000)
      }
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <ErrorNotification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <SuccessNotification message={successMessage} />
      <p>{`${user.name} logged in`}</p>
      <button onClick={handleLogout}>logout</button>

      <h2>List</h2>
      {blogForm()}
      <div className='bloglist'>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            like={() => likeBlog(blog.id)}
            remove={() => removeBlog(blog.id)}
            user={user.username}
          />
        )}
      </div>
    </div>
  )
}

export default App