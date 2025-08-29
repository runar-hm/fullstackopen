import { useReducer, createContext, useContext } from 'react';
import loginService from '../services/login';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SETUSER': {
      return action.payload;
    }
    case 'CLEARUSER': {
      return null;
    }
  }
  return state;
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, dispatchUser] = useReducer(userReducer, {});

  return (
    <UserContext.Provider value={[user, dispatchUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const valueAndDistpacth = useContext(UserContext);
  return valueAndDistpacth[0];
};

export const useUserDispatch = () => {
  const valueAndDistpacth = useContext(UserContext);
  return valueAndDistpacth[1];
};

export const useUserLogin = () => {
  const dispatch = useUserDispatch();
  return async (username, password) => {
    const credentials = { username, password };
    console.log(credentials);
    const res = await loginService.login(credentials);
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(res));
    dispatch({ type: 'SETUSER', payload: res });
  };
};

export default UserContext;
