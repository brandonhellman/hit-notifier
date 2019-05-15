import { store } from './redux/store';
import socketIoClient from 'socket.io-client';

import { connectedUpdate, hitAdded, hitHistory } from './redux/actions';

const url = process.env.NODE_ENV === `production` ? `http://192.241.193.247:8080` : `http://localhost:8080`;
const socket = socketIoClient(url);

socket.on(`connections`, (data) => {
  store.dispatch(connectedUpdate(data));
});

socket.on(`hit`, (data) => {
  store.dispatch(hitAdded(data));
});

socket.on(`history`, (data) => {
  store.dispatch(hitHistory(data));
});
