const createTransformer = require('./processor/transform');

function fiesta(ast) {
  return (...pluginCreators) => {
    const t = createTransformer(pluginCreators);
    return t(ast);
  };
}

module.exports = fiesta;
