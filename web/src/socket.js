import { store } from './redux/store';
import socketIoClient from 'socket.io-client';

import { connectedUpdate, hitAdded, hitHistory } from './redux/actions';

const socket = socketIoClient(`http://127.0.0.1:3001`);

socket.on(`connections`, (data) => {
  store.dispatch(connectedUpdate(data));
});

socket.on(`hit`, (data) => {
  store.dispatch(hitAdded(data));
});

socket.on(`history`, (data) => {
  store.dispatch(hitHistory(data));
});
