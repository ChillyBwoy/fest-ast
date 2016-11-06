#!/usr/bin/env node

const fs = require('fs');
const fiesta = require('../lib');

const [template, ...args] = process.argv.slice(2);

if (template) {
  const tpl = fs.readFileSync(template, 'utf8');
  const parse = fiesta();
  const ast = parse(tpl);
  
  if (args.indexOf('-ast') !== -1) {
    process.stdout.write(JSON.stringify(ast.ast));
  } else {
    process.stdout.write(ast.transform(
      require('../plugins/fiesta-transform-fest'),
      require('../plugins/fiesta-transform-expr')
    ));
  }
}
