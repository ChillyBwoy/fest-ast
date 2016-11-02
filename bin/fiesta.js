#!/usr/bin/env node
const fs = require('fs');
const fiesta = require('../lib/fiesta');

const [template, ...args] = process.argv.slice(2);
const TRACE = args.indexOf('-t') !== -1;
const AS_FUNC = args.indexOf('-f') !== -1;

if (template) {
  const tpl = fs.readFileSync(template, 'utf8');
  const ast = fiesta(tpl);

  if (AS_FUNC) {
    process.stdout.write(`module.exports = ${ast.asFunction({trace: TRACE})}`);
  } else {
    process.stdout.write(`module.exports = ${ast.asString({trace: TRACE})}`);
  }
}
