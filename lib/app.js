(function () {
  'use strict';

  function multi (pred) {
    var methods = new Map();

    var fn = function (...args) {
      var methodFn = methods.get(pred(...args));
      return methodFn ? methodFn(...args) : null;
    };

    fn.method = function (predKey, methodFn) {
      methods.set(predKey, methodFn);
      return this;
    };

    return fn;
  }

  function applyAttrs (el, attrs) {
    for (let key of Object.keys(attrs)) {
      el.setAttribute(key, attrs[key]);
    }
    return el;
  }

  const renderNode = multi(node => {
    switch (node.__type) {
      case 'text':
        return 'text';
      case 'node':
        return (node.__meta.prefix && node.__meta.prefix === 'fest') ? node.__meta.tag : 'html';
    }
  }).method('text', (node, json) => {
    return document.createTextNode(node.body);
  }).method('html', (node, json) => {
    let el = applyAttrs(document.createElement(node.__meta.tag), node.attrs);
    node.children.forEach(child => {
      let childEl = renderNode(child, json);
      if (childEl) {
        el.appendChild(childEl);
      }
    });
    return el;
  }).method('fest:template', (node, json) => {
    let el = document.createDocumentFragment('div');

    node.children.forEach(child => {
      let childEl = renderNode(child, json);
      if (childEl) {
        el.appendChild(childEl);
      }
    });
    return el;
  }).method('fest:if', (node, json) => {

  }).method('fest:for', (node, json) => {

  });

  function render (ast, json) {
    return renderNode(ast, json);
  }

  let {fest_ast} = window;
  let ast = fest_ast['simple.ast'];
  let el = render(ast(), {
    done: false
  });
  console.log(ast());
  console.log(el);

  document.getElementById('main').appendChild(el);
}());
