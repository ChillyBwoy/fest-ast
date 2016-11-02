const { createExprExtractor } = require('../../utils/string');
const festTermsFactory = require('../fest-terms');

const extract = createExprExtractor(e => `("" + (${e}))`, s => `"${s}"`);

function createReporo () {
  let store = {};

  return {
    addTemplate(name, body) {
      const tpl = `function (params) {
  return ${body};
}`;
      store[name] = tpl;
    },
    getTemplate(name) {
      return store[name];
    },
    getAll() {
      const kv = Object.keys(store).map(name => {
        let value = store[name];
        return `"${name}": ${value}`;
      });
      return `{${kv.join(',')}}`;
    }
  };
}

module.exports = function (f, getVar) {
  const repo = createReporo(getVar);
  const onVisit = (f) => f(repo);

  const festTerms = festTermsFactory(getVar, getNode, getChildren, onVisit);

  function expr (ast) {
    const { type, attrs, children } = ast;
    const extracted = extract.inObject(attrs);

    return `${f}('${type}', ${extracted}, [${getChildren(children)}])`;
  }

  function getNode (ast) {
    let node = festTerms(ast);
    if (node === null) {
      // пришли в тупик, например fest:set
      return null;
    } else if (typeof node === 'string') {
      // простая строка
      return node;
    } else {
      return expr(node);
    }
  }

  function getChildren (children, acc = []) {
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
    } else {
      return getChildren(rest, acc.concat(getNode(first)));
    }
  }

  return function (ast) {
    if (ast.type !== 'fest:template') {
      throw new Error('invalid template');
    }
    const { attrs: { context_name } } = ast;
    const rendered = getNode(ast);

    return `function (${f}) {
  var ${getVar('repo')} = ${repo.getAll()};
  return function (${context_name ? context_name : ''}) {
    return ${rendered};
  };
};`;
  };
};
