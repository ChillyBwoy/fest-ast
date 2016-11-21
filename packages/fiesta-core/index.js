const transform = require('./processor/transform');
const Validator = require('./utils/validator');

function fiesta(...pluginCreators) {
  return (ast) => {
    const plugins = pluginCreators.reduce((acc, plugin) => {
      if (typeof plugin === 'function') {
        return acc.concat(plugin());
      } else if (Array.isArray(plugin)) {
        // плагин может вернуть просто пачку других плагинов
        return acc.concat(plugin.map(p => p()));
      }
      return acc;
    }, []);

    return transform(ast, plugins);
  };
}

module.exports = {
  fiesta,
  Validator
};
