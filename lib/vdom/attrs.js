const isNone = (x) => x === null || typeof x === 'undefined';

function setAttr ($el, name, value) {
  $el.setAttribute(name, value);
  return $el;
}

function removeAttr ($el, name) {
  $el.removeAttribute(name);
  return $el;
}

function updateAttr ($el, name, newVal, oldVal) {
  if (isNone(newVal)) {
    removeAttr($el, name);
  } else if (isNone(oldVal) || newVal !== oldVal) {
    setAttr($el, name, newVal);
  }
  return $el;
}

export function setAttrs ($el, attrs) {
  Object.keys(attrs).forEach(name => {
    setAttr($el, name, attrs[name]);
  });
  return $el;
}

export function updateAttrs ($el, newAttrs, oldAttrs = {}) {
  const attrs = Object.assign({}, newAttrs, oldAttrs);
  Object.keys(attrs).forEach(name => {
    updateAttr($el, name, newAttrs[name], oldAttrs[name]);
  });
  return $el;
}
