const { getGrammarExpressions } = require('./fiesta/expressions');

function astAsFuncs (ast, f) {
  const grammar = getGrammarExpressions(astChildren);

  function astToString (ast) {
    return JSON.stringify(ast);
  }

  function astNode (n) {
    const { scope, name } = n.node;
    const params = n.params ? n.params : null;

    if (scope === 'fest') {
      switch (name) {
        case 'template':
          return `${f}('${n.type}', ${astToString(n.node)}, ${astToString(n.attrs)}, ${params}, [${astChildren(n.children)}])`;

        case 'value':
          return grammar.value(n);

        case 'attributes':
          return grammar.attributes(n);

        case 'if':
          return grammar.exprIf(n);

        case 'for':
          return grammar.exprFor(n);

        case 'each':
          return grammar.exprEach(n);

        default:
          let msg = `Unknown fiesta tag: "${scope}:${name}"`;
          throw new Error(msg);
      }
    }

    return `${f}('${n.type}', ${astToString(n.node)}, ${astToString(n.attrs)}, ${params}, [${astChildren(n.children)}])`;
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
