const parser = require('@mrgm/fiesta-parser');

const transform = require('./processor/transform');
const stringify = require('./processor/stringify');
const Validator = require('./utils/validator');
const source = require('./utils/escape');

function fiesta(...pluginCreators) {
  // необходимо нормализовать плагины, т.к. плагины могут находиться в массиве
  const plugins = pluginCreators.reduce((acc, plugin) => {
    if (typeof plugin === 'function') {
      return acc.concat(plugin());
    } else if (Array.isArray(plugin)) {
      // плагин может вернуть просто пачку других плагинов
      return acc.concat(plugin.map(p => p()));
    }
    return acc;
  }, []);

  function parse(tpl) {
    const p = parser();
    const ast = p(tpl);

    return {
      toJSON() {
        return ast;
      },

      transform() {
        const tree = transform(ast, plugins);
        return {
          toJSON() {
            return tree;
          },

          stringify() {
            return stringify(tree, plugins);
          }
        };
      }
    };
  }
  return parse;
}

module.exports = {
  fiesta,
  source,
  Validator
};
