function festTemplate(getVar, getNode, getChildren) {
  return (ast, v) => {
    const { children } = ast;
    return `[${getChildren(children)}]`;
  };
}

function festValue() {
  return (ast) => {
    const { children } = ast;
    return `("" + (${children.map(c => c.toString()).join('')}))`;
  };
}

function festSet(getVar, getNode, getChildren, onVisit) {
  return (ast, v) => {
    v.allExceptChildren(['fest:params']);

    const { attrs: { name }, children } = ast;
    return onVisit(storage => {
      storage.addItem(name, `function (params) {return [${getChildren(children)}];}`);
      return null;
    });
  };
}

function festGet(getVar) {
  return (ast, v) => {
    if (!v.onlyChildren(['fest:params'])) {
      return null;
    }

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
