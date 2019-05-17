import { playAudio } from '../../functions';

function HIT_ADDED(store, action) {
  const state = store.getState();

  if (!action.payload.filtered) {
    playAudio(state.settings);
  }
}

function SETTINGS_UPDATE(store, action) {
  const state = store.getState();

  if (action.payload.hitAudio || action.payload.hitVolume) {
    playAudio(state.settings);
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
