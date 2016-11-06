const crypto = require('crypto');

const TOKEN = crypto.randomBytes(4).toString('hex');
const FUNC_NAME = `f$${TOKEN}`;

function stringify(src) {
  return JSON.stringify(src);
}

class Transformer {
  constructor(plugins) {
    this._plugins = plugins.map(p => p(TOKEN, this.getNode.bind(this), this.getChildren.bind(this)));
  }

  applyPluginsTo(ast) {
    return this._plugins.reduce((result, plugin) => plugin.getNode(result), ast);
  }

  getNode(ast) {
    if (typeof ast === 'string') {
      // простые текстовые ноды
      return `'${ast}'`;
    }

    // запускаем обработку плагинами
    const transformed = this.applyPluginsTo(ast);

    if (typeof transformed === 'string') {
      return transformed;
    }

    // во время трансформации можно прервать traverse и вернуть нули, например fest:set
    if (transformed === null ||
        typeof transformed === 'undefined' ||
        typeof transformed === 'string') {
      return transformed;
    }

    const { type, attrs, children } = transformed;
    return `${FUNC_NAME}('${type}', ${typeof attrs !== 'string' ? stringify(attrs) : attrs}, [${this.getChildren(children)}])`;
  }

  getChildren(children, acc = []) {
    if (children.length === 0) {
      // убиваем все ноды с null
      return acc.filter(x => x !== null && typeof x !== 'undefined');
    }
    const [first, ...rest] = children;
    return this.getChildren(rest, acc.concat(this.getNode(first)));
  }

  getProlog() {
    return this._plugins.map(p => p.getProlog()).join('\n');
  }

  dispatch(ast) {
    const tree = this.getNode(ast);
    return `module.exports = function (${FUNC_NAME}) {
  ${this.getProlog()}
  return ${tree};
};`;
  }
}

function createTransformer(pluginCreators = []) {
  const t = new Transformer(pluginCreators);
  return (ast) => t.dispatch(ast);
}

module.exports = createTransformer;
