import store from './redux/store';
import socketIoClient from 'socket.io-client';

import { connectedUpdate } from './redux/actions';

const socket = socketIoClient(`http://127.0.0.1:3001`);

socket.on(`count`, (data) => {
  store.dispatch(connectedUpdate(data));
});
