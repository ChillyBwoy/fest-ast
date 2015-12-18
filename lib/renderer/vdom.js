'use strict';

function _wrap (f) {
  return function (...args) {
    return f(...args);
  };
}

function createTextNode (...args) {
  return document.createTextNode(...args);
}

function createElement () {
  let args = Array.prototype.slice.call(arguments, 0);
  return document.createElement(...args);
}

function renderNode (node) {
  switch (node.__type) {
    case 'text':
      return createTextNode('div');

    case 'node':
      return createElement('div');
  }
}

function render (root) {
  // let f = new Function('params', 'json', 'fest', `return ${params};`);
  // console.log(f({}, {}, {}));

  return renderNode(root);
}

module.exports = render;
