const Tracer = require('pegjs-backtrace');

const parser = require('./parser');
const createTransformer = require('./transform');


function fiesta(...pluginCreators) {
  const transform = createTransformer(pluginCreators);

  return (tpl) => {
    const tracer = new Tracer(tpl, {});
    try {
      const ast = parser.parse(tpl, { tracer });
      return {
        ast,
        transform() {
          return transform(ast);
        }
      };
    } catch (e) {
      return tracer.getBacktraceString();
    }
  };
}

module.exports = fiesta;
