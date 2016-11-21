function isNil(x) {
  return x === null || typeof x === 'undefined';
}

const tree = (ast) => (f) => {
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
      children: nextChildren
    };
  }
  return getNode(ast);
};

function createTransformer(pluginCreators = []) {
  const plugins = pluginCreators.reduce((acc, plugin) => {
    if (typeof plugin === 'function') {
      return acc.concat(plugin());
    } else if (Array.isArray(plugin)) {
      // плагин может вернуть просто пачку других плагинов
      return acc.concat(plugin.map(p => p()));
    }
    return acc;
  }, []);

  return (ast) => {
    return plugins.reduce((acc, p) => {
      const x = p.transform({
        root: acc,
        traverse: tree(acc)
      });
      return x;
    }, ast);
  };
}

module.exports = createTransformer;
