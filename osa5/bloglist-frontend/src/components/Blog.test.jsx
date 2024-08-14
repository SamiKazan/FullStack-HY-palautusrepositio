import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from './Blog'
import AddForm from './NewBlog'

// eslint-disable-next-line no-undef
test('renders blog title', () => {
  const blog = {
    title: 'TestblogTitle',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0,
    name: 'Test User',
    username: 'testuser'
  }

  const currentUser = {
    username: 'testuser'
  }

  render(<Blog blog={blog} likeBlog={() => {}} deleteBlog={() => {}} currentUser={currentUser} />)

  screen.debug()

  const titleElement = screen.getByText((content, element) => {
    return content.includes('TestblogTitle')
  })
  // eslint-disable-next-line no-undef
  expect(titleElement).toBeInTheDocument()
})

// eslint-disable-next-line no-undef
test('clicking toggle button shows blog details', async () => {
  const blog = {
    title: 'TestblogTitle',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0,
    name: 'Test User',
    username: 'testuser'
  }

  const currentUser = {
    username: 'testuser'
  }

  render(<Blog blog={blog} likeBlog={() => {}} deleteBlog={() => {}} currentUser={currentUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  screen.debug()

  expect(screen.getByText((content, element) => content.includes('http://testurl.com'))).toBeInTheDocument()
  expect(screen.getByText((content, element) => content.includes('likes') && content.includes('0'))).toBeInTheDocument()
  expect(screen.getByText((content, element) => content.includes('Test User'))).toBeInTheDocument()

})

test('clicking like button twice calls event handler twice', async () => {
  const blog = {
    title: 'TestblogTitle',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0,
    name: 'Test User',
    username: 'testuser'
  }

  const currentUser = {
    username: 'testuser'
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} likeBlog={mockHandler} deleteBlog={() => {}} currentUser={currentUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  screen.debug()

  const likebutton = screen.getByText('like')
  await user.click(likebutton)
  await user.click(likebutton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})

test('new blog form calls event handler with correct details', async () => {
  const user =userEvent.setup()
  const createBlog = vi.fn()
  const handleTitleChange = vi.fn()
  const handleAuthorChange = vi.fn()
  const handleUrlChange = vi.fn()

  render(
    <AddForm
      addBlog={createBlog}
      newTitle=""
      handleTitleChange={handleTitleChange}
      newAuthor=""
      handleAuthorChange={handleAuthorChange}
      newUrl=""
      handleUrlChange={handleUrlChange}
    />
  )

  const titleinput = screen.getByPlaceholderText('Title')
  const authorinput = screen.getByPlaceholderText('Author')
  const urlinput = screen.getByPlaceholderText('Url')
  const sendButton = screen.getByText('create')

  await user.type(titleinput, 'Test Title')
  await user.type(authorinput, 'Test Author')
  await user.type(urlinput, 'http://testurl.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://testurl.com')



})