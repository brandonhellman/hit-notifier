import { combineReducers } from 'redux';

import connected from './connected';
import theme from './theme';

export default combineReducers({
  connected,
  theme,
});
