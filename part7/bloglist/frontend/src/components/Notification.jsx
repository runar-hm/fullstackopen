import { Alert } from '@mui/material';
const Notification = ({ msg, type }) => {
  if (!msg) return null;
  return (
    <Alert severity={type} fontSize="inherit" className={type || 'info'}>
      <p>{msg}</p>
    </Alert>
  );
};

export default Notification;
