function HIT_ADDED(store, next, action) {
  const state = store.getState();

  if (state.settings.hideMasters && action.payload.isMasters) {
    console.warn(`filtered masters hit`, action.payload);
    return;
  }

  if (state.settings.hideUsOnly && action.payload.isUsOnly) {
    console.warn(`filtered us only hit`, action.payload);
    return;
  }

  return next(action);
}

function HIT_HISTORY(store, next, action) {
  const state = store.getState();

  const payload = action.payload.filter((hit) => {
    if (state.settings.hideMasters && hit.isMasters) {
      console.warn(`filtered masters hit`, hit);
      return false;
    }

    if (state.settings.hideUsOnly && hit.isUsOnly) {
      console.warn(`filtered us only hit`, hit);
      return false;
    }

    return true;
  });

  return next({ ...action, payload });
}

export default (store) => (next) => (action) => {
  switch (action.type) {
    case `HIT_ADDED`:
      return HIT_ADDED(store, next, action);
    case `HIT_HISTORY`:
      return HIT_HISTORY(store, next, action);
    default:
      return next(action);
  }
};
