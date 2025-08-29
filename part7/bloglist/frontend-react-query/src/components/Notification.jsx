import { useNotificationValue } from '../reducers/notificationContext';

const Notification = () => {
  const { msg, type } = useNotificationValue();
  if (!msg) return null;
  return (
    <div className={type || 'info'}>
      <p>{msg}</p>
    </div>
  );
};

export default Notification;
