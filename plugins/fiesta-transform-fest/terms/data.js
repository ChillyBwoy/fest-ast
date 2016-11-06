function festTemplate(getVar, getNode) {
  return (ast, v) => {
    v.allExceptChildren([
      'fest:params',
      'fest:param',
      'fest:attributes',
      'fest:attribute'
    ]);
    const { attrs: { context_name } } = ast;
    const root = getNode(Object.assign(ast, {
      type: '#fragment',
      attrs: {}
    }));

    return `function (${context_name ? context_name : ''}) {
        return ${root};
    };
    `;
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
    const { attrs, children } = ast;
    return onVisit(storage => {
      const node = {
        type: '#fragment',
        attrs: {},
        children
      };
      storage.addItem(attrs.name, `function (params) {return [${getNode(node)}];}`);
    });
  };
}

function festGet(getVar) {
  return (ast, v) => {
    v.onlyChildren(['fest:params']);
    const { attrs: { name } } = ast;
    return `${getVar('templates')}['${name}']({})`;
  };
}

module.exports = {
  festTemplate,
  festValue,
  festSet,
  festGet
};
