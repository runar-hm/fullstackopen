import userService from '../services/users';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../reducers/usersReducer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    userService.getAll().then((res) => dispatch(setUsers(res)));
  }, []);

  const users = useSelector((s) => s.users);

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
        </thead>

        <tbody>
          {users.map((usr) => {
            return (
              <tr key={usr.id}>
                <td>
                  <Link to={`/users/${usr.id}`}>{usr.username}</Link>
                </td>
                <td>{usr.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
