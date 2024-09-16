import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";

const AddForm = ({
  addBlog,
  newTitle,
  handleTitleChange,
  newAuthor,
  handleAuthorChange,
  newUrl,
  handleUrlChange,
}) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        Title
        <input
          data-testid="title"
          type="text"
          value={newTitle}
          name="Title"
          placeholder="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author
        <input
          data-testid="author"
          type="text"
          value={newAuthor}
          name="Author"
          placeholder="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        Url
        <input
          data-testid="url"
          type="text"
          value={newUrl}
          name="Url"
          placeholder="Url"
          onChange={handleUrlChange}
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

AddForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  newAuthor: PropTypes.string.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  newUrl: PropTypes.string.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
};

export default AddForm;
