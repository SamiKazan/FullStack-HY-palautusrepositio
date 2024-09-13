import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        showNotification(state, action) {
        return action.payload
        },
        clearNotification() {
        return null
        }
    }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
    return async dispatch => {
        dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout)
    }
}


export default notificationSlice.reducer