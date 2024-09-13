import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW':
        return {
          message: action.message
        }
      case 'HIDE':
        return {
          message: ''
        }
      default:
        return state
    }
  }

const NotificationContext = createContext()

export const NotificationProvider = (props) => {
    const [message, messageDispatch] = useReducer(notificationReducer, { message: '' })
  
    return (
      <NotificationContext.Provider value={{ message, messageDispatch }}>
        {props.children}
      </NotificationContext.Provider>
    )
}

export default NotificationContext