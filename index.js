'use strict';
const fs = require('fs');
const PEG = require('pegjs');

const grammar = fs.readFileSync('grammars/fest.pegjs', 'utf8');
const template = fs.readFileSync('templates/simple-with-params.xml', 'utf8');

const parser = PEG.buildParser(grammar);
let ast = parser.parse(template);


function renderAttrs (attributes) {
	return Object.keys(attributes).reduce(function (prev, key) {
		return prev.concat([key, '=', '"', attributes[key], '"'].join(''));
	}, []).join(' ');
}

function renderNode (node) {
	switch (node.__type) {
		case 'text':
			return node.body;

		case 'node':
			let attributes = renderAttrs(node.attributes || {});
			let children = (node.children || []).map((child) => {
				return renderNode(child);
			});
			if (children.length > 0) {
				return `<${node.__meta.tag}${attributes ? ' ' + attributes : ''}>${children.join('')}</${node.__meta.tag}>`;
			} else {
				return `<${node.__meta.tag}${attributes ? ' ' + attributes : ''}/>`;
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
