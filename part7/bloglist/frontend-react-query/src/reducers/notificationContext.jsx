import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
  console.log(state);

  switch (action.type) {
    case 'SETMSG': {
      return { ...state, msg: action.payload };
    }
    case 'SETMSGTYPE': {
      return { ...state, type: action.payload };
    }
    case 'CLEARMSG': {
      return { msg: '', type: '' };
    }
  }
  return state;
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, {
    msg: '',
    type: '',
  });

  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const valueAndDispatch = useContext(NotificationContext);
  return valueAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const valueAndDispatch = useContext(NotificationContext);
  return valueAndDispatch[1];
};

export const useSetNotification = () => {
  const dispact = useNotificationDispatch();

  return (msg, seconds, type = 'info') => {
    dispact({ type: 'SETMSGTYPE', payload: type });
    dispact({ type: 'SETMSG', payload: msg });

    setTimeout(() => {
      dispact({ type: 'CLEARMSG' });
    }, 1000 * seconds);
  };
};

export default NotificationContext;
