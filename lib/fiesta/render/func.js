const { createExprExtractor } = require('../../utils/string');
const { festTermsFactory } = require('../fest');

const extract = createExprExtractor(e => `("" + (${e}))`, s => `"${s}"`);

function createStorage() {
  const store = {};
  return {
    addItem(name, item) {
      store[name] = item;
    },
    getItem(name) {
      return store[name];
    },
    getAll() {
      const kv = Object.keys(store).map(name => {
        const value = store[name];
        return `"${name}": ${value}`;
      });
      return `{${kv.join(',')}}`;
    }
  };
}

module.exports = (f, getVar) => {
  const templateStorage = createStorage();
  const varsStorage = createStorage();

  const onVisit = (v) => v(templateStorage);

  const festTerms = festTermsFactory(getVar, getNode, getChildren, onVisit);

  function expr(ast) {
    const { type, attrs, children } = ast;
    const extracted = extract.inObject(attrs);

    return `${f}('${type}', ${extracted}, [${getChildren(children)}])`;
  }

  function getNode(ast) {
    const node = festTerms(ast);
    if (node === null) {
      // пришли в тупик, например fest:set
      return null;
    } else if (typeof node === 'string') {
      // простая строка
      return node;
    }
    return expr(node);
  }

  function getChildren(children, acc = []) {
    if (children.length === 0) {
      // убиваем все ноды с null
      return acc.filter(x => x !== null);
    }
    const [first, ...rest] = children;

    if (typeof first === 'string') {
      return getChildren(rest, acc.concat(`'${first}'`));
    } else if (first.type === 'comment') {
      return getChildren(rest, acc);
    } else if (first.type === 'cdata') {
      return getChildren(rest, acc);
    }
    return getChildren(rest, acc.concat(getNode(first)));
  }

  return (ast) => {
    if (ast.type !== 'fest:template') {
      throw new Error('invalid template');
    }
    const { attrs: { context_name } } = ast;
    const rendered = getNode(ast);

    return `function (${f}) {
  var ${getVar('templates')} = ${templateStorage.getAll()};
  var ${getVar('globals')} = ${varsStorage.getAll()};
  return function (${context_name ? context_name : ''}) {
    return ${rendered};
  };
};`;
  };
};
