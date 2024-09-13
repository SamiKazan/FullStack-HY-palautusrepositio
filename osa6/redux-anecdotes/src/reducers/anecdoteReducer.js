import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "/services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const id = action.payload.id
      const updatedState = state.map(anecdote => 
        anecdote.id !== id ? anecdote : action.payload
      )
      return updatedState.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    },

  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }  
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find(a => a.id === id)
    const updatedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    const returnedAnecdote = await anecdoteService.update(id, updatedAnecdote)
    dispatch(updateAnecdote(returnedAnecdote))
  } 
}

export default anecdoteSlice.reducer