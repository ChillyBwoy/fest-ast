const fs = require('fs');
const fiesta = require('../fiesta-core');

const fiestaTransformFest = require('../fiesta-transform-fest');
const fiestaTransformExpr = require('../fiesta-transform-expr');

module.exports = function fiestaCompile(template, args = []) {
  if (template) {
    const tpl = fs.readFileSync(template, 'utf8');
    const parse = fiesta();
    const ast = parse(tpl);

    if (args.indexOf('-ast') !== -1) {
      return JSON.stringify(ast.ast);
    }

    return ast.transform(
      fiestaTransformFest,
      fiestaTransformExpr
    );
  }
  return '';
};
