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

function SETTINGS_UPDATE(state, action) {
  return {
    ...state,
    ...action.payload,
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case `SETTINGS_UPDATE`:
      return SETTINGS_UPDATE(state, action);
    default:
      return state;
  }
}
