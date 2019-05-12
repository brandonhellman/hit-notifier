export function hitAdded(payload) {
  return {
    type: `HIT_ADDED`,
    payload,
  };
}

export function hitHistory(payload) {
  return {
    type: `HIT_HISTORY`,
    payload,
  };
}
