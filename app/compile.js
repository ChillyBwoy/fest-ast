const fs = require('fs');
const parser = require('../lib/parser/fest.js');

function astToString (name, ast) {
  let source = JSON.stringify(ast, null, 4);
  return `;(function() {
    var x = Function('return this')();
    if (!x.fest_ast) {
      x.fest_ast = {};
    }
    x.fest_ast['${name}'] = function () {
      return ${source};
    };
  }());`;
}

function compile (template) {
  const tpl = fs.readFileSync(`templates/src/${template}`, 'utf8');
  const ast = parser.parse(tpl);
  const name = template.split('/').slice(-1)[0].split('.')[0];

  fs.writeFile(`templates/compiled/${name}.ast.js`, astToString('simple.ast', ast), err => {
    if (err) {
      throw err;
    }
  });
}

compile('simple.xml');
compile('simple-with-params.xml');
