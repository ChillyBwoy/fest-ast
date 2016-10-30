const fs = require('fs');
const parser = require('./lib/parser/fest.js');

function compile (template) {
  const tpl = fs.readFileSync(`./app/templates/src/${template}`, 'utf8');
  const ast = parser.parse(tpl);

  return ast;
}

function astToString (ast) {
  return JSON.stringify(ast);
}

function astNode (node) {
  let buff = `t('${node.type}', '${node.tag}', ${astToString(node.attrs)}, ${node.params ? node.params : null}, [${astChildren(node.children)}])`;
  return buff;
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

const ast = compile('simple.xml');
console.log(ast);
// console.log(JSON.stringify(ast, '\n', 2));
// console.log('============');
// console.log(astNode(ast));
// compile('simple-with-params.xml');
