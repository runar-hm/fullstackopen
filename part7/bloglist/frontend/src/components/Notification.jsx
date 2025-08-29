import { useDispatch } from 'react-redux';
import { setMsg, setMsgType, clearMsg } from '../reducers/notificationReducer';

const Notification = ({ msg, type }) => {
  if (!msg) return null;
  return (
    <div className={type || 'info'}>
      <p>{msg}</p>
    </div>
  );
};

export default Notification;
