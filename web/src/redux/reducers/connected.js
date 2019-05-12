const initialState = 0;

function CONNECTED_UPDATE(state, action) {
  return action.payload;
}

export default function(state = initialState, action) {
  switch (action.type) {
    case `CONNECTED_UPDATE`:
      return CONNECTED_UPDATE(state, action);
    default:
      return state;
  }
}
