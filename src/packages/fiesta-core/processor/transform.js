const TOKEN = require('./token');

const { isNil, notNil } = require('../utils/common');

function normalize(nodes, merged = []) {
  if (!Array.isArray(nodes)) {
    return nodes;
  }
  if (nodes.length === 0) {
    return merged.filter(notNil);
  }
  const [head, ...tail] = nodes;
  const last = merged.slice(-1)[0];

  let nextNodes = [];
  if ((notNil(head) && notNil(last)) &&
      (last.type === head.type) && head.type === '#text') {
    const nextNode = {
      type: last.type,
      attrs: {},
      children: `${last.children}${head.children}`
    };
    nextNodes = merged.slice(0, -1).concat(nextNode);
  } else {
    nextNodes = merged.concat(head);
  }

  return normalize(tail, nextNodes);
}

function getNodeBy(f, ast) {
  function getNode(node) {
    if (typeof node === 'string') {
      return node;
    }
    if (isNil(node)) {
      return null;
    }

    const nextNode = f(node);

    if (typeof nextNode === 'string') {
      return nextNode;
    }
    if (isNil(nextNode)) {
      return null;
    }

    const { type, attrs, children } = nextNode;

    let nextChildren;
    if (Array.isArray(children)) {
      nextChildren = [];
      for (const child of children) {
        nextChildren.push(getNode(child));
      }
    } else if (typeof children === 'string') {
      nextChildren = children;
    } else if (isNil(children)) {
      nextChildren = [];
    }

    return {
      type,
      attrs,
      children: normalize(nextChildren)
    };
  }
  return getNode(ast);
}

function transform(ast, plugins = []) {
  return plugins.reduce((acc, p) => {
    return p.transform(acc, {
      getNodeBy,
      token: TOKEN
    });
  }, ast);
}

module.exports = transform;
