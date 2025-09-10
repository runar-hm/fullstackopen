import { LOGIN } from '../queries';
import { useMutation } from '@apollo/client';

const LoginForm = (props) => {
  if (!props.show) {
    return null;
  }
  const [login, result] = useMutation(LOGIN, {
    update: (cache, response) => {
      window.localStorage.setItem(
        'library-user-token',
        response.data.login.value
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    await login({ variables: { username } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="usernname" type="text"></input>
      </form>
      <button type="submit">Login</button>
    </div>
  );
};

export default LoginForm;
