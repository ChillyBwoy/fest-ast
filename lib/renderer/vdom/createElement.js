'use strict';

export function createTextNode (...args) {
  return document.createTextNode(...args);
}

export function createDOMNode (tag, attrs={}) {
  let el = document.createElement(tag);
  for (let key of Object.keys(attrs)) {
    el.setAttribute(key, attrs[key]);
  }
  return el;
}

export function createFESTRoot () {
  return document.createDocumentFragment();
}
