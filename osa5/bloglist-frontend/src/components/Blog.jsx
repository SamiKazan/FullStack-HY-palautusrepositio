import { useState } from "react"


const Blog = ({ blog, likeBlog, deleteBlog, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVis = () => {
    setVisible(!visible)
  }

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={toggleVis}>{visible ? 'hide' : 'view'}</button>
    {visible && (
    <>
    <br />
    url: {blog.url}
    <br />
    likes: {blog.likes} <button onClick={likeBlog}>like</button>
    <br />
    by: {blog.name}
    <br />
    {currentUser.username === blog.username &&
    <button onClick={deleteBlog}>remove</button>}
    </>
    
    )}
  </div>  

)}

export default Blog