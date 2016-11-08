const fs = require('fs');
const path = require('path');
const peg = require('pegjs');
const Tracer = require('pegjs-backtrace');

const createTransformer = require('./transform');

// const parser = require('./parser');
const grammar = fs.readFileSync(path.resolve(__dirname, './grammars/fest.pegjs'), 'utf-8');
const parser = peg.generate(grammar, {
  startRule: 'Start',
  cache: true,
  optimize: 'speed',
  trace: true
});

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
