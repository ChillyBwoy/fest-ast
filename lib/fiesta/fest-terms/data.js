function festTemplate (v, getChildren) {
  return function (ast) {
    const { children } = ast;
    return `[${getChildren(children)}]`;
  };
}

function festValue (v, getChildren) {
  return function (ast) {
    const { children } = ast;
    return `(${children.map(c => c.toString()).join('')}).toString()`;
  };
}

module.exports = {
  festTemplate,
  festValue
};