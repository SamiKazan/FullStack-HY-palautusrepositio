const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0;

  blogs.forEach(blog => {
    total += blog.likes;
  })

  return total
}

const favoriteBlog = (blogs) => {
  let best = blogs[0]

  blogs.forEach(blog => {
    if (blog.likes > best.likes) {
      best = blog
    }
  })
  return best
}

const mostBlogs = (blogs) => {
  let authors = {}

  blogs.forEach(blog => {
    if (authors[blog.author]) {
      authors[blog.author] += 1
    } else {
      authors[blog.author] = 1
    }
  })

  let most = Object.entries(authors).reduce((a, b) => a[1] > b[1] ? a : b)[0]

  return {
    author: most,
    blogs: authors[most]
  }
}

const mostLkes = (blogs) => {
  let authors = {}

  blogs.forEach(blog => {
    if (authors[blog.author]) {
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
  })

  let most = Object.entries(authors).reduce((a, b) => a[1] > b[1] ? a : b)[0]

  return {
    author: most,
    likes: authors[most]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLkes,
}