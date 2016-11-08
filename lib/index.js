const fs = require('fs');
const path = require('path');
const peg = require('pegjs');
const Tracer = require('pegjs-backtrace');

const createTransformer = require('./transform');

const grammar = fs.readFileSync(path.resolve(__dirname, './grammars/fest-new.pegjs'), 'utf-8');
const Parser = peg.generate(grammar, {
  startRule: 'Start',
  cache: true,
  optimize: 'speed',
  trace: true
});

function fiesta() {
  return (tpl) => {
    const tracer = new Tracer(tpl, {
      showTrace: false
    });
    try {
      const ast = Parser.parse(tpl, { tracer });
      return {
        ast,
        transform(...pluginCreators) {
          const t = createTransformer(pluginCreators);
          return t(ast);
        }
      };
    } catch (e) {
      throw e;
      const log = tracer.getBacktraceString();
      throw `${e.message}\n${log}`;
    }
  };
}

module.exports = fiesta;
