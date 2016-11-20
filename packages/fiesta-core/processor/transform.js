function isNil(x) {
  return x === null || typeof x === 'undefined';
}

function traverse(node, f) {
  if (typeof node === 'string') {
    return node;
  }
  const { type, attrs, children } = f(node);

  let nextChildren;
  if (Array.isArray(children)) {
    nextChildren = [];
    for (const child of children) {
      nextChildren.push(traverse(child, f));
    }
  } else if (typeof children === 'string') {
    nextChildren = children;
  } else if (isNil(children)) {
    nextChildren = [];
  }

  return {
    type,
    attrs,
    children: nextChildren
  };
}

function createTransformer(pluginCreators = []) {
  const plugins = pluginCreators.map(p => p());
  return (ast) => {
    return plugins.reduce((acc, p) => {
      return p.transform(acc, { traverse });
    }, ast);
  };
}

module.exports = createTransformer;
