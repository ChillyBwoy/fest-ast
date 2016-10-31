import { setAttrs } from './attrs';
import { transform } from './transform';

function createChildren (children) {
  let $fragment = document.createDocumentFragment();
  children.forEach(item => {
    if (item !== null) {
      let $el = createElement(item);
      if ($el) {
        $fragment.appendChild($el);
      }
    }
  });
  return $fragment;
}

function createElementFest (ast) {
  const { type, attrs, children } = ast;

  switch (type) {
    case 'fest:template':
      return createChildren(children);

    case 'fest:if':
      return createChildren(children);

    case 'fest:for':
      return createChildren(children);

    case 'fest:value':
      return createChildren(children);

    default:
      throw new Error(`invalid fest tag: ${type}`);
  }
}

function createElementDOM (ast) {
  const { type, attrs, children } = ast;
  const $el = document.createElement(type);

  setAttrs($el, attrs);

  if (children.length > 0) {
    $el.appendChild(createChildren(children));
  }
  return $el;
}

function createElement (ast) {
  if (ast === null) {
    return;
  }
  if (typeof ast === 'string') {
    return document.createTextNode(ast);
  } else {
    const { scope } = ast;
    if (scope === 'fest') {
      return createElementFest(ast);
    } else {
      return createElementDOM(ast);
    }
  }
}


export function createVDOM (f) {
  const ast = f(transform);
  return createElement(ast);
}
