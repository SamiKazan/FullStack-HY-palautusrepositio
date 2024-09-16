import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import AddForm from "./components/NewBlog"
import Notification from "./components/Notification"
import './index.css'
import Toggleable from "./components/ToggleNewBlog"
import { setNotification } from "./reducers/notificationReducer"
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch(setNotification("Wrong username or password", 5000))
    }
  }

  const handeLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            data-testid="password"
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
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

    return (
      <div>
        <h2>blogs</h2>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={() => likeBlog(blog)}
            deleteBlog={() => deleteBlog(blog)}
            currentUser={user}
          />
        ))}
      </div>
    )
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user.username,
    }

    const addedBlog = await blogService.create(blogObject)
    setBlogs([...blogs, addedBlog])
    dispatch(setNotification(`Added New Blog ${newTitle} by ${newAuthor}`, 5000))
    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
  }

  const likeBlog = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)))
      dispatch(setNotification(`Liked ${blog.title} by ${blog.author}`, 5000))
    } catch (error) {
      dispatch(setNotification(`Error liking ${blog.title}`, 5000))
    }
  }

  const deleteBlog = async (blog) => {
    const confirmation = window.confirm(
      `Delete ${blog.title} by ${blog.author}?`,
    )
    if (!confirmation) {
      return
    }
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      dispatch(setNotification(`Deleted ${blog.title} by ${blog.author}`, 5000))
    } catch (error) {
      dispatch(setNotification(`Error deleting ${blog.title}`, 5000))
    }
  }

  return (
    <div>
      <Notification />
      <h1>Blog site</h1>
      {!user && loginForm()}

      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handeLogout}>logout</button>

          <Toggleable buttonLabel="new blog">
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
          </Toggleable>

          {blogForm()}
        </div>
      )}
    </div>
  )
}

export default App
