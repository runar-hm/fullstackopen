import { useSetNotification } from '../reducers/notificationContext';
import { useState } from 'react';
import { useUserLogin } from '../reducers/userContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const setNotification = useSetNotification();

  const userLogin = useUserLogin();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      console.log(username);
      userLogin(username, password);
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
