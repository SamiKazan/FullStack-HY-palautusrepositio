import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddForm from './components/NewBlog'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ 
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handeLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
        type = "text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const addBlog = async (event) => {
    event.preventDefault()
    
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user.username
    }

    await blogService.create(blogObject)
    setMessage(`Added New Blog ${newTitle} by ${newAuthor}`)
    setTimeout(() => {
        setMessage(null)
    }, 5000)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }


  return (
    <div>
      <Notification message={message}/>
      <h1>Blog site</h1>
      {!user && loginForm()}

      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={handeLogout}>logout</button>

        <h2>Create new blog</h2>
        <AddForm 
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
        handleTitleChange={({ target }) => setNewTitle(target.value)}
        handleAuthorChange={({ target }) => setNewAuthor(target.value)}
        handleUrlChange={({ target }) => setNewUrl(target.value)}
        addBlog={addBlog}
        />


        {blogForm()}
        </div>
      }
    </div>
  )

}

export default App