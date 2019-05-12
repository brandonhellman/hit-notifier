const initialState = [];

function HIT_ADDED(state, action) {
  return [action.payload, ...state.slice(0, 25)];
}

function HIT_HISTORY(state, action) {
  return action.payload;
}

export default function(state = initialState, action) {
  switch (action.type) {
    case `HIT_ADDED`:
      return HIT_ADDED(state, action);
    case `HIT_HISTORY`:
      return HIT_HISTORY(state, action);
    default:
      return state;
  }
}
