import PropTypes from 'prop-types'

import { useState, useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = ( {newAnecdoteMutation} ) => {
  const { messageDispatch } = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    if (content.length < 5) {
      messageDispatch({ type: 'SHOW',
         message: 'Anecdote must be at least 5 characters long' })
      setTimeout(() => {
        messageDispatch({ type: 'HIDE' })
      }, 5000)
      return
    }

    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

AnecdoteForm.propTypes = {
  newAnecdoteMutation: PropTypes.shape({
    mutate: PropTypes.func.isRequired,
  }).isRequired,
}

export default AnecdoteForm
