const Tracer = require('pegjs-backtrace');

const parser = require('./parser');
const createTransformer = require('./transform');


function fiesta() {
  return (tpl) => {
    const tracer = new Tracer(tpl, {});
    try {
      const ast = parser.parse(tpl, { tracer });
      return {
        ast,
        transform(...pluginCreators) {
          const t = createTransformer(pluginCreators);
          return t(ast);
        }
      };
    } catch (e) {
      return tracer.getBacktraceString();
    }
  };
}

module.exports = fiesta;
