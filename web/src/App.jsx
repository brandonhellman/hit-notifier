import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import Body from './components/Body';
import Header from './components/Header';
import Layout from './components/Layout';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Header />
          <Body />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default App;
