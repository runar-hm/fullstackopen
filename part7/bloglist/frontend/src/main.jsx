import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { setToken } from './services/requests';
import store from './reducers/store';

import CssBaseline from '@mui/material/CssBaseline';

const raw = window.localStorage.getItem('loggedBlogUser');
let user = null;

if (raw) {
  user = JSON.parse(raw);
  setToken(user.token); // token klart før første render
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CssBaseline>
      <App />
    </CssBaseline>
  </Provider>
);
