#!/usr/bin/env node
const fs = require('fs');
const { fiesta } = require('@mrgm/fiesta-core');

const fiestaTransformFest = require('@mrgm/fiesta-plugin-fest');
const fiestaTransformExpr = require('@mrgm/fiesta-plugin-expr');

const [template, ...args] = process.argv.slice(2);

if (template) {
  const tpl = fs.readFileSync(template, 'utf8');
  const compile = fiesta(
    fiestaTransformFest,
    fiestaTransformExpr
  );

  const ast = compile(tpl);

  if (args.indexOf('-a') !== -1) {
    process.stdout.write(JSON.stringify(ast.toJSON(), null, 2));
    return;
  }

  const tree = ast.transform();
  if (args.indexOf('-t') !== -1) {
    process.stdout.write(JSON.stringify(tree.toJSON(), null, 2));
    return;
  }

  process.stdout.write(tree.stringify());
}
