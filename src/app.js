import simpleForm from './templates/simple-form';

function d (type, tag, attrs, params, children) {
  return {
    type,
    tag,
    attrs,
    params,
    children
  };
}

function setAttr ($el, name, value) {
  $el.setAttribute(name, value);
}

function setAttrs ($el, attrs) {
  Object.keys(attrs).forEach(name => {
    setAttr($el, name, attrs[name]);
  });
}

function createChildren (children) {
  let $fragment = document.createDocumentFragment();
  children
    .map(createElement)
    .forEach($fragment.appendChild.bind($fragment));
  return $fragment;
}

function createElementDOM (node) {
  const { name } = node.tag;
  const $el = document.createElement(name);

  setAttrs($el, node.attrs);
  // addEventListeners($el, node.props);

  if (node.children.length > 0) {
    $el.appendChild(createChildren(node.children));
  }
  return $el;
}

function createElementFest (node) {
  const { attrs, children } = node;
  const { type, name } = node.tag;

  switch (type) {
    case 'template':
      return createChildren(node.children);

    case 'if':
      if (!attrs.test) {
        throw new Error('invalid fest:if');
      }
      console.log(attrs.test);
      return;

    default:
      throw new Error(`invalid fest tag: ${name}`);
  }
}

function createElement (node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  } else if (node.type === 'text') {
    let [text, ...rest] = node.children;
    return document.createTextNode(text);
  } else if (node.type === 'node') {
    const { scope } = node.tag;
    if (scope === 'dom') {
      return createElementDOM(node);
    } else if (scope === 'fest') {
      return createElementFest(node);
    }
  }
}

const tpl = simpleForm(d);
const a1 = tpl();

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.getElementById('root');
  $root.appendChild(createElement(a1));
});
