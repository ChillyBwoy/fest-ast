export function setAttr ($el, name, value) {
  $el.setAttribute(name, value);
}

export function setAttrs ($el, attrs) {
  Object.keys(attrs).forEach(name => {
    setAttr($el, name, attrs[name]);
  });
}
