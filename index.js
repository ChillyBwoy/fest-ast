'use strict';
const fs = require('fs');
const PEG = require('pegjs');

const grammar = fs.readFileSync('grammars/fest.pegjs', 'utf8');
const template = fs.readFileSync('templates/simple.xml', 'utf8');

const parser = PEG.buildParser(grammar);
let result = parser.parse(template);

console.log(JSON.stringify(result, '', 2));
