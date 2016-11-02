const { createExprExtractor } = require('../../utils/string');
const festTermsFactory = require('../fest-terms');

const extract = createExprExtractor(e => `("" + (${e}))`, s => `"${s}"`);

module.exports = function (f, getVar) {
  const festTerms = festTermsFactory(getVar, getChildren);

  function expr (ast) {
    const { type, attrs, children } = ast;
    const extracted = extract.inObject(attrs);

    return `${f}('${type}', ${extracted}, [${getChildren(children)}])`;
  }

  function getNode (ast) {
    let e = festTerms(ast);
    return (typeof e === 'string') ? e : expr(e);
  }

  function getChildren (children, acc = []) {
    if (children.length === 0) {
      return acc;
    }
    const [first, ...rest] = children;

    if (typeof first === 'string') {
      return getChildren(rest, acc.concat(`'${first}'`));
    } else if (first.type === 'comment') {
      return getChildren(rest, acc);
    } else if (first.type === 'cdata') {
      return getChildren(rest, acc);
    } else {
      return getChildren(rest, acc.concat(getNode(first)));
    }
  }
  return getNode;
};
