import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { msg: '', type: '' },
  reducers: {
    setMsg(state, action) {
      console.log('setting msg', action.payload);
      return { ...state, msg: action.payload };
    },
    setMsgType(state, action) {
      return { ...state, type: action.payload };
    },
    clearMsg(state, action) {
      return { msg: '', type: '' };
    },
  },
});

export const { setMsg, setMsgType, clearMsg } = notificationSlice.actions;

export const setNotification = (msg, timeoutSeconds, type = 'info') => {
  return (dispatch) => {
    dispatch(setMsg(msg));
    dispatch(setMsgType(type));

    setTimeout(() => {
      dispatch(clearMsg());
    }, timeoutSeconds * 1000);
  };
};

export default notificationSlice.reducer;
