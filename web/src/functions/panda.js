export function dispatchPanda(hit, name, once) {
  const event = new CustomEvent(name, {
    detail: { ...hit, once },
  });

  document.dispatchEvent(event);
}
