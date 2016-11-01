import { setAttrs, updateAttrs } from './attrs';
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

function createElement (ast) {
  if (ast === null) {
    return;
  }
  if (typeof ast === 'string') {
    return document.createTextNode(ast);
  } else if (Array.isArray(ast)) {
    return createChildren(ast);
  } else {
    const { type, attrs, children } = ast;
    const $el = setAttrs(document.createElement(type), attrs);

    if (children.length > 0) {
      $el.appendChild(createChildren(children));
    }
    return $el;
  }
}

function changed (node1, node2) {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type;
}

function resolveNodes (node1, node2) {
  if (Array.isArray(node1) && Array.isArray(node2)) {
    return {
      node1: node1[0],
      node2: node2[0]
    };
  } else if (Array.isArray(node1) && !Array.isArray(node2)) {
    return {
      node1: node1[0],
      node2
    };
  } else if (!Array.isArray(node1) && Array.isArray(node2)) {
    return {
      node1,
      node2: node2[0]
    };
  } else {
    return {
      node1,
      node2
    };
  }
}

function updateElement ($parent, newNode, oldNode, index = 0) {
  const { node1, node2 } = resolveNodes(newNode, oldNode);

  if (!node2) {
    $parent.appendChild(
      createElement(node1)
    );
  } else if (!node1) {
    $parent.removeChild(
      $parent.childNodes[index]
    );
  } else if (changed(node1, node2)) {
    $parent.replaceChild(
      createElement(node1),
      $parent.childNodes[index]
    );
  } else if (typeof node1 === 'string' || typeof node2 === 'string') {
    if (node1 !== node2) {
      $parent.replaceChild(
        createElement(node1),
        $parent.childNodes[index]
      );
    }
  } else {
    updateAttrs($parent.childNodes[index], node1.attrs, node2.attrs);
    const newLength = node1.children.length;
    const oldLength = node2.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        node1.children[i],
        node2.children[i],
        i
      );
    }
  }
}

export function createVDOM ($root, ast) {
  const tree = ast(transform);
  let curr = null;

  return function (data) {
    if (curr === null) {
      curr = tree(data);
      updateElement($root, curr);
    } else {
      let next = tree(data);
      updateElement($root, next, curr);
      curr = next;
    }
  };
}
