import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMsg, setErrorMsg] = useState('');

  const notify = ({ errorMsg }) => {
    setErrorMsg(errorMsg);

    setTimeout(() => {
      setErrorMsg('');
    }, 5000);
  };

  const Notification = () => {
    if (errorMsg) {
      return <div>{errorMsg}</div>;
    }
  };

  return (
    <div>
      <Notification />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors setError={notify} show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;
