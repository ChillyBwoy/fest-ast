'use strict';

const fs = require('fs');
const render2Fest = require('./lib/renderer/fest.js');
const parser = require('./lib/parser/fest.js');

const template = fs.readFileSync('templates/simple-with-params.xml', 'utf8');

let ast = parser.parse(template);
let res = render2Fest(ast);

console.log('fest -> AST:\n\n');
console.log(JSON.stringify(ast, '', 2), '\n\n');
console.log('AST -> fest:\n\n');
console.log(res);
