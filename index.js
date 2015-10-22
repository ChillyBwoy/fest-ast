'use strict';
const fs = require('fs');
const PEG = require('pegjs');

const grammar = fs.readFileSync('grammars/fest.pegjs', 'utf8');
const template = fs.readFileSync('templates/simple.xml', 'utf8');

const parser = PEG.buildParser(grammar);
let ast = parser.parse(template);


function renderAttrs (attrs) {
	return Object.keys(attrs).reduce(function (prev, key) {
		return prev.concat([key, '=', '"', attrs[key], '"'].join(''));
	}, []).join(' ');
}

function renderNode (node) {
	switch (node.type) {
		case 'text':
			return node.body;

		case 'node':
			let attrs = renderAttrs(node.attrs || {});
			let children = (node.children || []).map((child) => {
				return renderNode(child);
			});
			if (children.length > 0) {
				return `<${node.name}${attrs ? ' ' + attrs : ''}>${children.join('')}</${node.name}>`;
			} else {
				return `<${node.name}${attrs ? ' ' + attrs : ''}/>`;
			}
	}
}

function render (root) {
	return renderNode(root);
}

let res = render(ast);
console.log('fest -> AST:\n\n');
console.log(JSON.stringify(ast, '', 2), '\n\n');
console.log('AST -> fest:\n\n');
console.log(res);
