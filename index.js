'use strict';

const fs = require('fs');
const PEG = require('pegjs');

const festRender = require('./renderer/fest.js');
const vdomRender = require('./renderer/vdom.js');

const grammar = fs.readFileSync('grammars/fest.pegjs', 'utf8');
const template = fs.readFileSync('templates/simple-with-params.xml', 'utf8');

const parser = PEG.buildParser(grammar);
let ast = parser.parse(template);

// let res = festRender(ast);
// let res = vdomRender(ast);
//

fs.writeFile('ast/simple-with-params.json', JSON.stringify(ast, '', 2));

console.log('fest -> AST:\n\n');
console.log(JSON.stringify(ast, '', 2), '\n\n');
// console.log('AST -> fest:\n\n');
