function festTemplate() {
  return (ast, v) => {
    v.allExceptChildren([
      'fest:params',
      'fest:param',
      'fest:attributes',
      'fest:attribute'
    ]);
    return Object.assign(ast, {
      type: '#fragment'
    });
  };
}

function festValue() {
  return (ast, v) => {
    v.onlyOneChildrenOfType('#text');
    const { children } = ast;
    const body = children
      .reduce((acc, c) => acc.concat(c.children), [])
      .map(c => ('' + c)).join('');
    return `('' + ${body})`;
  };
}

function festSet(getVar, getNode, getChildren, onVisit) {
  return (ast, v) => {
    v.allExceptChildren([
      'fest:params',
      'fest:param',
    ]);
    const { attrs: { name }, children } = ast;
    return onVisit(storage => {
      // storage.addItem(name, `function (params) {return [${getChildren(children)}];}`);
      return null;
    });
  };
}

function festGet() {
  return (ast) => {
    return ast;
    // v.onlyChildren(['fest:params']);
    //
    // const { attrs: { name } } = ast;
    // return `${getVar('templates')}['${name}']({})`;
  };
}

module.exports = {
  festTemplate,
  festValue,
  festSet,
  festGet
};
