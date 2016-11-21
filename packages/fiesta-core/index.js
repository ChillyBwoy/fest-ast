const createTransformer = require('./processor/transform');
const Validator = require('./utils/validator');

function fiesta(ast) {
  return (...pluginCreators) => {
    const t = createTransformer(pluginCreators);
    return t(ast);
  };
}

module.exports = {
  fiesta,
  Validator
};
