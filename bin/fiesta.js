#!/usr/bin/env node

const fs = require('fs');
const parser = require('../lib/parser.js');

function compile (tplPath) {
  const tpl = fs.readFileSync(tplPath, 'utf8');
  const ast = parser.parse(tpl);
  return ast;
}

function astToString (ast) {
  return JSON.stringify(ast);
}

function indent (num) {
  let s = '';
  for (let i = 0; i < num; i++) {
    s += '-';
  }
  return s;
}

function astWrap (ast, f) {
  return `module.exports = function (${f}) {
  return function (json = {}, params = {}) {
    return ${astAsFuncs(ast, f)};
  };
};`;
}

function astAsFuncs (ast, f) {
  function astNode (n) {
    let buff = `${f}('${n.type}', ${astToString(n.node)}, ${astToString(n.attrs)}, ${n.params}, [${astChildren(n.children)}])`;
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

  return astNode(ast);
}

const [template, ...args] = process.argv.slice(2);

if (template) {
  const ast = compile(template);
  const fIndex = args.indexOf('-f');

  if (fIndex !== -1) {
    console.log(astWrap(ast, args[fIndex + 1]));
  } else {
    console.log(`module.exports = ${JSON.stringify(ast, '\n', 2)}`);
  }
}
