#!/usr/bin/env node
const fs = require('fs');
const fest = require('fest');

function compile (tplPath) {
  const str = fest.compile(tplPath, {
    std: false,
    beautify: true,
    mode: 'vdom'
  });
  return str;
}

function wrap (ast, f) {
  return `module.exports = function (${f}) {
  return function (json = {}, params = {}) {
    return ${astAsFuncs(ast, f)};
  };
};`;
}

const [template, ...args] = process.argv.slice(2);

if (template) {
  const ast = compile(template);
  process.stdout.write(`module.exports = ${ast}`);
}
