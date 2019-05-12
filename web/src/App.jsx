import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';

import Body from './components/Body';
import Header from './components/Header';
import Layout from './components/Layout';

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header />
        <Body />
      </Layout>
    </Provider>
  );
}

export default App;
