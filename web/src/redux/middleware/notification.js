import { newHitNotification } from '../../functions';

function HIT_ADDED(store, action) {
  const state = store.getState();
  newHitNotification(state.settings, action.payload);
}

function SETTINGS_UPDATE(store, action) {
  const state = store.getState();

  if (action.payload.hitNotification) {
    newHitNotification(state.settings, { test: `test` });
  }
}

export default (store) => (next) => (action) => {
  const result = next(action);

  switch (action.type) {
    case `HIT_ADDED`:
      HIT_ADDED(store, action);
      break;
    case `SETTINGS_UPDATE`:
      SETTINGS_UPDATE(store, action);
      break;
    default:
    // do nothing
  }

  return result;
};
