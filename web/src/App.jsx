import React from 'react';
import socketIoClient from 'socket.io-client';

import Header from './components/Header';
import Layout from './components/Layout';

function App() {
  const socket = socketIoClient(`http://127.0.0.1:3001`);
  socket.on(`count`, (data) => {
    console.log(data);
  });

  return (
    <Layout>
      <Header />
    </Layout>
  );
}

export default App;
