const AddForm = ({addBlog, newTitle, handleTitleChange, 
    newAuthor, handleAuthorChange, newUrl, handleUrlChange }) => {
    return (
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
          type="text"
          value={newTitle}
          name="Title"
          onChange={handleTitleChange}
          />
        </div>
        <div>
          Author
          <input
          type="text"
          value={newAuthor}
          name="Author"
          onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url
          <input
          type="text"
          value={newUrl}
          name="Url"
          onChange={handleUrlChange}
          />
        </div>
        <div>
            <button type="submit">create</button>
          </div>
      </form>
    )
  }

  export default AddForm
