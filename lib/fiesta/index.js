const { factory } = require('./fest-terms');
const { stringify, createExprExtractor } = require('../utils/string');

function astAsFuncs (ast, f) {
  const festTerms = factory(f, astChildren);

  const extract = createExprExtractor(e => `(${e})`, s => `"${s}"`);

  function extractAttrs (attrs) {
    let buff = '{\n';
    Object.keys(attrs).forEach(name => {
      let value = extract(attrs[name]);
      buff += `"${name}": ${value.join('+')},\n`;
    });
    return buff + '}\n';
  }

  function expr (ast) {
    const { type, attrs, children } = ast;
    const extracted = extractAttrs(attrs);

    return `${f}('${type}', ${extracted}, [${astChildren(children)}])`;
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
