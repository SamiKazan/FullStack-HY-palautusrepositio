import { configureStore } from '@reduxjs/toolkit'
import anecdototeReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from "./reducers/notificationReducer"

const store = configureStore({
  reducer: {
    anecdotes: anecdototeReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store