const { fiesta } = require('@mrgm/fiesta-core');
const fiestaTransformFest = require('@mrgm/fiesta-plugin-fest');
const fiestaTransformExpr = require('@mrgm/fiesta-plugin-expr');

module.exports = function fiestaLoader(source) {
  const compile = fiesta(
    fiestaTransformFest,
    fiestaTransformExpr
  );
  return compile(source).transform().stringify();
};
