import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import usersService from '../services/users';
import { useParams } from 'react-router-dom';
import { setUsers, fetchUser } from '../reducers/usersReducer';

const User = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const user = useSelector((state) => state.users.find((u) => u.id === id));

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser(id));
    }
  }, [id, user]);

  console.log('user:', user);

  if (!user) {
    return <div>no user</div>;
  }
  return (
    <>
      <h2>{user.fullName}</h2>
      <ul>
        {console.log(user.blogs)}
        {user.blogs.map((b) => {
          return <li key={b.id}>{b.title}</li>;
        })}
      </ul>
    </>
  );
};

export default User;
