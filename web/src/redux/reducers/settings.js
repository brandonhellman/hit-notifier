export const initialState = {
  // General
  dark: false,

  // Notifications
  hitNotification: true,
  hitSound: ``,
  hitVolume: 100,

  // Filters
  hideMasters: false,
  hideUsOnly: false,

  // Panda
  hitCatcher: false,
  pandaCrazy: false,
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
