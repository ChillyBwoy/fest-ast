import tplSimpleForm from './templates/simple-form';
import tplTodos from './templates/todos';
import tplTodosFest from './templates/todos.fest';

function d (type, node, attrs, params, children) {
  return {
    name: `${node.scope}:${node.name}`,
    type,
    node,
    attrs,
    params,
    children: Array.prototype.concat.apply([], children)
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

    if (scope === 'xml') {
      return createElementDOM(node);
    } else if (scope === 'fest') {
      return createElementFest(node);
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

const tpl = tplTodos(d);

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

  const a1 = tpl(state1);
  const a2 = tpl(state2);

  console.log(a1);
  console.log(tplTodosFest(state1));
  // console.log(a2, createElement(a2));
  $root.appendChild(createElement(a1));
  updateElement($root, a1, a2);

  // updateElement($root, a1);
  // setTimeout(() => {
  //   updateElement($root, a1, a2);
  // }, 1000);
});
