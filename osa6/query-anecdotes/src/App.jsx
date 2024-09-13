import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './services/requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'


const App = () => {
  const queryClient = useQueryClient()
  const { messageDispatch } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (createdAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      messageDispatch({ type: 'SHOW',
         message: `you created '${createdAnecdote.content}'` })
      setTimeout(() => {
        messageDispatch({ type: 'HIDE' })
      }, 5000)

    },
    onError: (error) => {
      messageDispatch({ type: 'SHOW',
         message: error.response.data.error })
      setTimeout(() => {
        messageDispatch({ type: 'HIDE' })
      }, 5000)
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updateAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      messageDispatch({ type: 'SHOW',
         message: `you voted '${updateAnecdote.content}'` })
      setTimeout(() => {
        messageDispatch({ type: 'HIDE' })
      }, 5000)
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })   
  }

  const anecdotes = result.data

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
