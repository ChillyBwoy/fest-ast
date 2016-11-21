function isNil(x) {
  return x === null || typeof x === 'undefined';
}

function normalize(nodes, merged = []) {
  if (!Array.isArray(nodes)) {
    return nodes;
  }
  if (nodes.length === 0) {
    return merged;
  }
  const [head, ...tail] = nodes;
  const last = merged.slice(-1)[0];

  let nextNodes = [];
  if ((typeof head !== 'undefined' && typeof last !== 'undefined') &&
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
    const { type, attrs, children } = f(node);

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
      getNodeBy
    });
  }, ast);
}

module.exports = transform;
