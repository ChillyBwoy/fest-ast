function festTemplate (getVar, getNode, getChildren) {
  return function (ast) {
    const { children } = ast;
    return `[${getChildren(children)}]`;
  };
}

function festValue (getVar, getNode, getChildren) {
  return function (ast) {
    const { children } = ast;
    return `("" + (${children.map(c => c.toString()).join('')}))`;
  };
}

function festSet (getVar, getNode, getChildren, onVisit) {
  return function (ast) {
    const { attrs: { name }, children } = ast;

    return onVisit(storage => {
      storage.addItem(name, `function (params) {return [${getChildren(children)}];}`);
      return null;
    });
  };
}

function festGet (getVar, getNode, getChildren, onVisit) {
  return function (ast) {
    const { attrs: { name }, children } = ast;
    return `${getVar('templates')}['${name}']({})`;
  };
}

module.exports = {
  festTemplate,
  festValue,
  festSet,
  festGet
};
