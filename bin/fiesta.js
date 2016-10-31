#!/usr/bin/env node
const fs = require('fs');
const parser = require('../lib/parser.js');
const { astAsFuncs } = require('../lib');

function compile (tplPath) {
  const tpl = fs.readFileSync(tplPath, 'utf8');
  const ast = parser.parse(tpl);
  return ast;
}

function astWrap (ast, f) {
  return `module.exports = function (${f}) {
  return function (json = {}, params = {}) {
    return ${astAsFuncs(ast, f)};
  };
};`;
}

const [template, ...args] = process.argv.slice(2);

if (template) {
  const ast = compile(template);
  const fIndex = args.indexOf('-f');

  if (fIndex !== -1) {
    process.stdout.write(astWrap(ast, args[fIndex + 1]));
  } else {
    process.stdout.write(`module.exports = ${JSON.stringify(ast, '\n', 2)}`);
  }
}
