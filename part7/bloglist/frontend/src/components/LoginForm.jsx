import { loginUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(loginUser(username, password));
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('error', exception);
      setNotification('Wrong username or password', 20, 'error');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          placeholder="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>
        password
        <input
          type="password"
          placeholder="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <button type="submit">login</button>
      </div>
    </form>
  );
};

export default LoginForm;
