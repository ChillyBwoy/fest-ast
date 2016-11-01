function setAttr ($el, name, value) {
  $el.setAttribute(name, value);
  return $el;
}

function removeAttr ($el, name, value) {
  $el.removeAttribute(name);
  return $el;
}

function updateAttr ($el, name, newVal, oldVal) {
  if (!newVal) {
    removeAttr($el, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setAttr($el, name, newVal);
  }
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
