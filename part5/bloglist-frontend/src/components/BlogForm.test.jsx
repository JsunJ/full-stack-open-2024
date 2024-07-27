import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls given event handler with correct parameter when submitted', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'blog form test')
  await user.type(authorInput, 'john doe')
  await user.type(urlInput, 'test-blog.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('blog form test')
  expect(createBlog.mock.calls[0][0].author).toBe('john doe')
  expect(createBlog.mock.calls[0][0].url).toBe('test-blog.com')
})