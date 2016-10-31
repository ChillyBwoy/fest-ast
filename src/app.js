import tplSimpleForm from './templates/simple-form';

import tplTodosF from './templates/todos';
import tplToolkitF from './templates/toolkit';

import tplToolkitFest from './templates/toolkit.fest';

function d (type, node, attrs, children) {
  const n = {
    name: node.scope ? `${node.scope}:${node.name}` : node.name,
    type,
    node,
    attrs,
    children: Array.prototype.concat.apply([], children)
  };
  console.log(n);
  return n;
}

function setAttr ($el, name, value) {
  $el.setAttribute(name, value);
}

function setAttrs ($el, attrs) {
  Object.keys(attrs).forEach(name => {
    setAttr($el, name, attrs[name]);
  });
}

function removeAttr ($target, name, value) {
  $target.removeAttribute(name);
}

function updateAttr ($target, name, newVal, oldVal) {
  if (!newVal) {
    removeAttr($target, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setAttr($target, name, newVal);
  }
}

function updateAttrs ($target, newAttrs, oldAttrs = {}) {
  const attrs = Object.assign({}, newAttrs, oldAttrs);
  Object.keys(attrs).forEach(name => {
    updateAttr($target, name, newAttrs[name], oldAttrs[name]);
  });
}

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

function createElementDOM (node) {
  const { name } = node.node;
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
  const { name } = node.node;

  switch (name) {
    case 'template':
      return createChildren(node.children);

    default:
      throw new Error(`invalid fest tag: ${name}`);
  }
}

function createElement (node) {
  if (node === null) {
    return;
  }
  if (typeof node === 'string') {
    return document.createTextNode(node);
  } else if (node && node.type === 'node') {
    const { scope } = node.node;

    if (scope === 'fest') {
      return createElementFest(node);
    } else {
      return createElementDOM(node);
    }
  } else {
    return document.createTextNode(node.toString());
  }
}

function hasDiff (node1, node2) {
  let notEqualTypes = (typeof node1 !== typeof node2);
  let bothStringsAndNotEqual = (
    (typeof node1 === 'string') &&
    (typeof node2 === 'string') &&
    (node1 !== node2)
  );
  let notEqual = (node1.type !== node2.type);

  return notEqualTypes ||
         bothStringsAndNotEqual ||
         notEqual;
}

function updateElement ($root, newNode, oldNode, index = 0) {
  if (!oldNode) {
    console.log('no oldNode');
  } else if (!newNode) {
    console.log('np new node');
  } else if (hasDiff(newNode, oldNode)) {
    console.log('diff!!!');
  } else {
      const newLength = newNode.children.length;
      const oldLength = oldNode.children.length;

      for (let i = 0; i < newLength || i < oldLength; i++) {
      }
  }

  // if (!oldNode) {
  //   $parent.appendChild(
  //     createElement(newNode)
  //   );
  // } else if (!newNode) {
  //   $parent.removeChild(
  //     $parent.childNodes[index]
  //   );
  // } else if (hasDiff(newNode, oldNode)) {
  //   $parent.replaceChild(
  //     createElement(newNode),
  //     $parent.childNodes[index]
  //   );
  // } else if (newNode.type === 'node') {
  //   // updateAttrs($parent.childNodes[index], newNode.attrs, oldNode.attrs);
  //
  //   const newLength = newNode.children.length;
  //   const oldLength = oldNode.children.length;
  //
  //   for (let i = 0; i < newLength || i < oldLength; i++) {
  //     updateElement(
  //       $parent.childNodes[index],
  //       newNode.children[i],
  //       oldNode.children[i],
  //       i
  //     );
  //   }
  // }
}

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.getElementById('root');
  let state1 = {
    newTodo: 'initial state',
    really: {
      first: 'make a coffee',
      second: 'code'
    },
    todos: [
      { text: 'first' },
      { text: 'second' }
    ]
  };
  let state2 = {
    newTodo: 'second state',
    really: {
      first: 'make a coffee',
      second: 'code',
      third: 'lunch',
      fourth: 'relax'
    },
    todos: [
      { text: 'first' },
      { text: 'second' }
    ]
  };
  const tplToolkit = tplToolkitF(d);
  const tplTodos = tplTodosF(d);

  const a1 = tplTodos(state1);
  console.log(createElement(a1));
  console.log(tplToolkitFest(a1));

  $root.appendChild(createElement(a1));
});
