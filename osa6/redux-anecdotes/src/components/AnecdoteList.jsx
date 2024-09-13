import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(setNotification(`You voted '${votedAnecdote.content}'`, 5000))
  }

  const filteredAnecdotes = filter === ''
    ? anecdotes
    : anecdotes.filter(anecdote => anecdote.content && anecdote.content.includes(filter))

  return (
      <div>
        {filteredAnecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      </div>
  )

}

export default AnecdoteList