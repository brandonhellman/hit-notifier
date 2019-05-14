import { combineReducers } from 'redux';

import connected from './connected';
import hits from './hits';
import settings from './settings';

export default combineReducers({
  connected,
  hits,
  settings,
});
