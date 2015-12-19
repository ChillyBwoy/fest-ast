function renderAttrs (attrs={}) {
  return Object.keys(attrs).reduce(function (prev, key) {
    return prev.concat([key, '=', '"', attrs[key], '"'].join(''));
  }, []).join(' ');
}

function renderNode (node) {
  switch (node.__type) {
    case 'text':
      return node.body;

    case 'node':
      let attrs = renderAttrs(node.attrs);
      let children = (node.children || []).map(child => renderNode(child));
      if (children.length > 0) {
        return `<${node.__meta.tag}${attrs ? ' ' + attrs : ''}>${children.join('')}</${node.__meta.tag}>`;
      } else {
        return `<${node.__meta.tag}${attrs ? ' ' + attrs : ''}/>`;
      }
  }
}

export function render (root) {
  return renderNode(root);
}
