#!/usr/bin/env node
const fs = require('fs');
const parser = require('../lib/parser');
const { astAsFuncs } = require('../lib/fiesta');

function compile (tplPath) {
  const tpl = fs.readFileSync(tplPath, 'utf8');
  return parser.parse(tpl);
}

function astWrap (ast) {
  const S = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  const FUNC_NAME = `ast$${S}`;

  return `module.exports = function (${FUNC_NAME}) {
  return ${astAsFuncs(ast, FUNC_NAME)};
};`;
}

const [template, ...args] = process.argv.slice(2);

if (template) {
  const ast = compile(template);
  const wrapInFunc = args.indexOf('-f') !== -1;

  if (wrapInFunc) {
    process.stdout.write(astWrap(ast));
  } else {
    process.stdout.write(`module.exports = ${JSON.stringify(ast)}`);
  }
}
