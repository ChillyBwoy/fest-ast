#!/usr/bin/env node
const fs = require('fs');
const Parser = require('@mrgm/fiesta-parser');
const { fiesta } = require('@mrgm/fiesta-core');

const fiestaTransformFest = require('@mrgm/fiesta-transform-fest');
const fiestaTransformExpr = require('@mrgm/fiesta-transform-expr');

const [template, ...args] = process.argv.slice(2);

if (template) {
  const parse = Parser();

  const tpl = fs.readFileSync(template, 'utf8');
  const ast = parse(tpl);

  if (args.indexOf('-t') !== -1) {
    process.stdout.write(JSON.stringify(ast, null, 2));
  } else {
    const transform = fiesta(ast);
    const tree = transform(
      fiestaTransformFest,
      fiestaTransformExpr
    );
    console.log(JSON.stringify(tree, null, 2));
    // process.stdout.write(JSON.stringify(tree, null, 2));
  }
}
