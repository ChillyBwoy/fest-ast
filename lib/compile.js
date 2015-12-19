const parser = require('./parser/fest.js');

export function compile (template) {
  let ast = parser.parse(template);
  return ast;
}

export function wrap (name, ast) {
  let source = JSON.stringify(ast);
  return `;(function () {
    var namespace = Function('return this')();
    if (!namespace.festAST) {
      namespace.festAST = {};
    }
    namespace.festAST['${name}'] = function () {
      return ${source};
    };
  }());`;
}


fs.writeFile('templates/compiled/simple.ast.js', astToString('simple.ast', ast), err => {
  if (err) {
    throw err;
  }
});
