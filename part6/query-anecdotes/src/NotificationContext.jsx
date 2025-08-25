import { createContext, useReducer, useContext } from 'react'

const notificationReducer =  ( state, action ) => {
    console.log(action)
    
    switch(action.type) {
        case 'SETMSG': {
            console.log('setting msg', action.payload)
            return state = action.payload
        }
        case 'CLEAR': {
            return state = null
        }
    }
    return state
}

const NotificationContext = createContext()

export const NotificationContextProvider = ( props ) => {

    const [ notification, dispatchNotification ] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, dispatchNotification]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const valueAndDispatch = useContext(NotificationContext)
    return valueAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const valueAndDispatch = useContext(NotificationContext)
    return valueAndDispatch[1]
}

export default NotificationContext