const { factory } = require('./fest-terms');
const { stringify } = require('../utils/string');

function astAsFuncs (ast, f) {
  const festTerms = factory(f, astChildren);

  function expr (ast) {
    const { type, attrs, children } = ast;
    return `${f}('${type}', ${stringify(attrs)}, [${astChildren(children)}])`;
  }

  function astNode (ast) {
    let e = festTerms(ast);
    if (typeof e === 'string') {
      return e;
    } else {
      return expr(e);
    }
  }

  function astChildren (children, acc = []) {
    if (children.length === 0) {
      return acc;
    }
    const [first, ...rest] = children;

    if (typeof first === 'string') {
      return astChildren(rest, acc.concat(`'${first}'`));
    } else if (first.type === 'comment') {
      return astChildren(rest, acc);
    } else if (first.type === 'cdata') {
      return astChildren(rest, acc);
    } else {
      return astChildren(rest, acc.concat(astNode(first)));
    }
  }

  return astNode(ast);
}


module.exports = {
  astAsFuncs
};
