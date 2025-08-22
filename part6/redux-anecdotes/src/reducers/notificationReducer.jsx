import { createSlice } from '@reduxjs/toolkit'


const initialState = {msg:null}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification( state, action ) {
            return {...state, msg: action.payload}
        },
        clear( state, action ) {
            return initialState
        }
    }
})

export const { setNotification, clear } = notificationSlice.actions
export default notificationSlice.reducer