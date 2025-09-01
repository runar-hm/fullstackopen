import { loginUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Stack, Box } from '@mui/material';
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
    <Stack
      component="form"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
      spacing={2}
      noValidate
      autoComplete="off"
      onSubmit={handleLogin}
    >
      <h2>Log in to Blog App</h2>
      <TextField
        type="text"
        placeholder="username"
        value={username}
        label="username"
        variant="filled"
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      ></TextField>
      <TextField
        type="password"
        placeholder="password"
        label="password"
        variant="filled"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      ></TextField>
      <Button type="submit" variant="contained" color="primary">
        login
      </Button>
    </Stack>
  );
};

export default LoginForm;
