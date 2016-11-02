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
    return onVisit(repo => {
      repo.addTemplate(name, `[${getChildren(children)}]`);
      return null;
    });
  };
}

function festGet (getVar, getNode, getChildren, onVisit) {
  return function (ast) {
    const { attrs: { name }} = ast;
    return `${getVar('repo')}['${name}']({})`;
    // return onVisit(repo => {
    //   return
    //   const tpl = repo.getTemplate(name);
    // });
  };
}

module.exports = {
  festTemplate,
  festValue,
  festSet,
  festGet
};
