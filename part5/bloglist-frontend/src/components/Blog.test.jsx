import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author without url or likes by default', () => {
  const blog = {
    title: 'Blog component test',
    author: 'tester',
    url: 'http://blog-component-test.com',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  const urlElement = div.querySelector('.blog-url')
  const likesElement = div.querySelector('.blog-likes')

  expect(div).toHaveTextContent('Blog component test')
  expect(div).toHaveTextContent('tester')
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('url and likes are shown when detail button is clicked', async () => {
  const blog = {
    title: 'Blog component test',
    author: 'tester',
    url: 'http://blog-component-test.com',
    likes: 0,
    user: {}
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  const user = userEvent.setup()
  const button = div.querySelector('.details-btn')
  await user.click(button)

  const urlElement = div.querySelector('.blog-url')
  const likesElement = div.querySelector('.blog-likes')
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
  expect(urlElement).toHaveTextContent('http://blog-component-test.com')
  expect(likesElement).toHaveTextContent('0')
})