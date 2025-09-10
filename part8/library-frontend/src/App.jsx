import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useSubscription } from '@apollo/client';

import { ALL_BOOKS, BOOK_ADDED } from './queries';

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMsg, setErrorMsg] = useState('');

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`A new book was added in the DB: ${addedBook.title}`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

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
        <button onClick={() => setPage('login')}>login</button>
      </div>

      <Authors setError={notify} show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} />
    </div>
  );
};

export default App;
