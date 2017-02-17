const { notNil, toStr } = require('../utils/common');
const source = require('../utils/escape');
const TOKEN = require('./token');

const FUNC_NAME = `f$${TOKEN}`;

function expr({ type, attrs, children }) {
  return `${FUNC_NAME}('${type}', ${attrs}, ${children})`;
}

function attrsToString(attrs) {
  const chunks = Object.keys(attrs).map(name => {
    const value = attrs[name];
    return `"${name}": ${value}`;
  });

  return `{\n${chunks.join(',\n')}}`;
}

class Stringifier {
  getNode(ast) {
    // простые текстовые ноды
    if (typeof ast === 'string') {
      return ast;
    }

    /**
     * во время трансформации можно прервать traverse и вернуть
     * null | undefined | string:
     * 1) в случае с null/undefined считаем, что мы достигли дна и
     *    прерываем обработку, например fest:set, который
     * 2) в случае со string считаем, что обработка завершена
     */
    if (ast === null || typeof ast === 'undefined') {
      return ast;
    }
    const { type, attrs, children } = ast;

    if (type === '#text') {
      return `${children}`;
    } else if (type === '#comment') {
      return null; // not implemented yet
    } else if (type === '#cdata') {
      return null; // not implemented yet
    }

    return expr({
      type,
      attrs: typeof attrs !== 'string' ? toStr(attrs) : attrs,
      children: `[${this.getChildren(children)}]`
    });
  }

  getChildren(children, acc = []) {
    if (children.length === 0) {
      // убиваем все ноды с null
      return acc.filter(notNil);
    }
    const [first, ...rest] = children;
    return this.getChildren(rest, acc.concat(this.getNode(first)));
  }

  get token() {
    return TOKEN;
  }
}

function defaultStringifier(ast, stringifier) {
  const str = stringifier.getNode(ast);
  return `module.exports = function (${FUNC_NAME}) {
return ${str};
};\n`;
}

function stringify(ast, plugins = []) {
  const inst = new Stringifier();
  const tree = plugins.reduce((acc, p) => {
    if (typeof p.stringify === 'function') {
      return p.stringify(acc, inst);
    }
    return acc;
  }, ast);
  return defaultStringifier(tree, inst);
}

module.exports = stringify;
