#!/usr/bin/env node

const fs = require('fs');
const parse = require('./lib/parser');

const template = process.argv.slice(2)[0];

if (template) {
  const tpl = fs.readFileSync(template, 'utf8');
  const ast = parse(tpl);

  process.stdout.write(JSON.stringify(ast, null, 2));
}
