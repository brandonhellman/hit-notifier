const initialState = {
  theme: `light`,
};

function SETTINGS_TOGGLE_THEME(state, action) {
  return {
    ...state,
    theme: state.theme === `light` ? `dark` : `light`,
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
