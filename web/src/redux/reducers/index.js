import { combineReducers } from 'redux';

import connected from './connected';
import hits from './hits';
import theme from './theme';

export default combineReducers({
  connected,
  hits,
  theme,
});
