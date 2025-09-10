import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

const AuthorForm = ({ all_authors }) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name, setBornTo: year } });
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleYearChange = (e) => {
    e.preventDefault();
    setYear(parseInt(e.target.value));
  };

  if (result.error) {
    console.log(result.error);
    return <div>Error</div>;
  }

  const options = () => {
    if (all_authors.lenght < 1) {
      return <div>no authors</div>;
    }
    return (
      <select
        onChange={handleNameChange}
        name="selectedAuthor"
        default={all_authors[0]}
      >
        {all_authors.map((a, idx) => {
          return (
            <option key={idx} value={a.name}>
              {a.name}test
            </option>
          );
        })}
      </select>
    );
  };

  return (
    <div>
      <h2>add birthyear</h2>
      <form onSubmit={submit}>
        <div>{options()}</div>
        <div>
          year:
          <input
            name="year"
            type="number"
            value={year}
            onChange={handleYearChange}
            placeholder="birthyear"
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuthorForm;
