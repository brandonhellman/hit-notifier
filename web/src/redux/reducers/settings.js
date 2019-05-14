const initialState = {
  dark: false,
};

function SETTINGS_TOGGLE_THEME(state, action) {
  return {
    ...state,
    dark: action.payload,
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case `SETTINGS_TOGGLE_THEME`:
      return SETTINGS_TOGGLE_THEME(state, action);
    default:
      return state;
  }
}
