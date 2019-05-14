import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

const persistConfig = {
  key: `root`,
  storage: storage,
  whitelist: [`settings`],
};

const loggerConfig = {
  collapsed: true,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const logger = createLogger(loggerConfig);
const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export { store, persistor };
