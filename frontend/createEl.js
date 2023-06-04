export function createEl(tag, options) {
  const el = document.createElement(tag);

  if (!options) {
    return el;
  }

  for (const entry of Object.entries(options)) {
    const [key, value] = entry; 
    el[key] = value;
  }

  return el;
}