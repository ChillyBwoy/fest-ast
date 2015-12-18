'use strict';

const fs = require('fs');
const render2Fest = require('../lib/renderer/fest.js');
const parser = require('../lib/parser/fest.js');

const template = fs.readFileSync('templates/simple.xml', 'utf8');

let ast = parser.parse(template);

function astToString (name, ast) {
  let source = JSON.stringify(ast);
  return `;(function() {
    var x = Function('return this')();
    if (!x.fest_ast) {
      x.fest_ast = {};
    }
    x.fest_ast['${name}'] = function (json) {
      return ${source};
    };
  }());`;
}

fs.writeFile('js/simple.ast.js', astToString('simple.ast', ast), err => {
  if (err) {
    throw err;
  }
});
