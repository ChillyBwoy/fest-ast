'use strict';

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


module.exports = render;
