const terms = require('./terms');

function plugin() {
  return {
    name: 'fest',
    transform(ast, methods) {
      let tree;
      for (const term of terms) {
        tree = term(ast, methods);
      }
      return tree;
    }
  };
}

module.exports = plugin;
