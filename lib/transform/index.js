const crypto = require('crypto');
const { createAttrsExtractor } = require('./attrs');

const TOKEN = crypto.randomBytes(4).toString('hex');
const FUNC_NAME = `f$${TOKEN}`;

const extractAttrs = createAttrsExtractor(e => `("" + (${e}))`, s => `"${s}"`);

class Transformer {
  constructor(plugins) {
    this._plugins = plugins.map(p => p(TOKEN, this.getNode.bind(this), this.getChildren.bind(this)));
  }

  applyPluginsTo(ast) {
    return this._plugins.reduce((result, plugin) => plugin.getNode(result), ast);
  }

  getNode(ast) {
    if (ast === null) {
      // пришли в тупик, например fest:set
      return null;
    } else if (typeof ast === 'string') {
      return `'${ast}'`;
    }
    const transformed = this.applyPluginsTo(ast);

    if (typeof transformed === 'string') {
      return transformed;
    }

    const { type, attrs, children } = transformed;
    return `${FUNC_NAME}('${type}', ${extractAttrs(attrs)}, [${this.getChildren(children)}])`;
  }

  getChildren(children, acc = []) {
    if (children.length === 0) {
      // убиваем все ноды с null
      return acc.filter(x => x !== null);
    }
    const [first, ...rest] = children;
    return this.getChildren(rest, acc.concat(this.getNode(first)));
  }
}

function createTransformer(pluginCreators = []) {
  const t = new Transformer(pluginCreators);
  return (ast) => t.getNode(ast);
}

module.exports = createTransformer;

// return `function (${FUNC_NAME}) {
//   var ${getVar('templates')} = ${templateStorage.getAll()};
//   var ${getVar('globals')} = ${varsStorage.getAll()};
//   return function (${context_name ? context_name : ''}) {
//     return ${rendered};
//   };
// };`;
