const fiesta = require('@mrgm/fiesta-core');
const fiestaTransformFest = require('@mrgm/fiesta-transform-fest');
const fiestaTransformExpr = require('@mrgm/fiesta-transform-expr');

const parse = fiesta();

module.exports = function fiestaLoader(source) {
  const ast = parse(source);
  return ast.transform(
    fiestaTransformFest,
    fiestaTransformExpr
  );
};
