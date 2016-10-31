const { getGrammarExpressions } = require('./fiesta/expressions');

function astAsFuncs (ast, f) {
  const grammar = getGrammarExpressions(astChildren);

  function astToString (ast) {
    return JSON.stringify(ast);
  }

  function astNode (n) {
    const { scope, name } = n.node;
    const def = `${f}('${n.type}', ${astToString(n.node)}, ${astToString(n.attrs)}, [${astChildren(n.children)}])`;

    if (scope === 'fest') {
      switch (name) {
        case 'template':
          return def;

        case 'value':
          return grammar.value(n);

        case 'attributes':
          return def;

        case 'if':
          return grammar.exprIf(n);

        case 'for':
          return grammar.exprFor(n);

        case 'each':
          return grammar.exprEach(n);

        case 'get':
          return def;

        case 'set':
          return def;

        case 'script':
          return null;
          // return grammar.exprScript(n);

        case 'attribute':
          return def;

        case 'element':
          return def;

        case 'params':
          return def;

        case 'param':
          return def;

        default:
          let msg = `Unknown fiesta tag: "${scope}:${name}"`;
          throw new Error(msg);
      }
    }
    return def;
  }

  function astChildren (children, acc = []) {
    if (children.length === 0) {
      return acc;
    }
    const [curr, ...rest] = children;

    if (typeof curr === 'string') {
      return astChildren(rest, acc.concat(`'${curr}'`));
    } else if (curr.type === 'comment') {
      return astChildren(rest, acc);
    } else if (curr.type === 'cdata') {
      return astChildren(rest, acc);
    } else {
      return astChildren(rest, acc.concat(astNode(curr)));
    }
  }

  return astNode(ast);
}


module.exports = {
  astAsFuncs
};
