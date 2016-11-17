const crypto = require('crypto');

const TOKEN = crypto.randomBytes(4).toString('hex');
const FUNC_NAME = `f$${TOKEN}`;

function stringify(src) {
  return JSON.stringify(src);
}

function isNotNil(x) {
  return x !== null && typeof x !== 'undefined';
}

function expr({ type, attrs, children }) {
  return `${FUNC_NAME}('${type}', ${attrs}, ${children})`;
}

class Transformer {
  constructor(plugins) {
    this._plugins = plugins.map(p => p(TOKEN, this.getNode.bind(this), this.getChildren.bind(this)));
  }

  applyPluginsTo(ast) {
    return this._plugins.reduce((result, plugin) => plugin.getNode(result), ast);
  }

  getNode(ast) {
    // простые текстовые ноды
    if (typeof ast === 'string') {
      return `'${ast}'`;
    }

    // запускаем обработку плагинами
    const result = this.applyPluginsTo(ast);
    /**
     * во время трансформации можно прервать traverse и вернуть
     * null | undefined | string:
     * 1) в случае с null/undefined считаем, что мы достигли дна и
     *    прерываем обработку, например fest:set, который
     * 2) в случае со string считаем, что обработка завершена
     */
    if (typeof result === 'string') {
      // для строки необходимо сделать экранирование
      return result;
    } else if (result === null || typeof result === 'undefined') {
      return result;
    }
    const { type, attrs, children } = result;

    if (type === '#text') {
      return `'${children}'`;
    } else if (type === '#comment') {
      return null; // not implemented yet
    } else if (type === '#cdata') {
      return null; // not implemented yet
    }

    return expr({
      type,
      attrs: typeof attrs !== 'string' ? stringify(attrs) : attrs,
      children: `[${this.getChildren(children)}]`
    });
  }

  getChildren(children, acc = []) {
    if (children.length === 0) {
      // убиваем все ноды с null
      return acc.filter(isNotNil);
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
};\n`;
  }
}

function createTransformer(pluginCreators = []) {
  const t = new Transformer(pluginCreators);
  return (ast) => t.dispatch(ast);
}

module.exports = createTransformer;
