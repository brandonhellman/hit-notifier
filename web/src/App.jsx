import React from 'react';
import socketIoClient from 'socket.io-client';

function App() {
  const socket = socketIoClient(`http://127.0.0.1:3001`);
  socket.on(`count`, (data) => {
    console.log(data);
  });

  return <div>HIT Notifier</div>;
}

export default App;
