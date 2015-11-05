'use strict';

const fs = require('fs');
const Parser = require('./lib/parser.js').Parser;
const festRender = require('./lib/renderer/fest.js');

const template = fs.readFileSync('templates/simple-with-params.xml', 'utf8');
const parser = new Parser();

let ast = parser.parse(template);
let res = festRender(ast);

console.log('fest -> AST:\n\n');
console.log(JSON.stringify(ast, '', 2), '\n\n');
console.log('AST -> fest:\n\n');
console.log(res);
