const fs = require('fs');
const path = require('path');
const peg = require('pegjs');
const Tracer = require('pegjs-backtrace');

const createTransformer = require('./transform');

const fiestaPlugins = [
  // require('../plugins/peg-parse-plugins')
];

const grammar = fs.readFileSync(path.resolve(__dirname, './grammars/fest.pegjs'), 'utf-8');
const Parser = peg.generate(grammar, {
  startRule: 'Start',
  cache: true,
  optimize: 'speed',
  trace: true,
  format: 'commonjs',
  plugins: fiestaPlugins,
  dependencies: {
    escapeSource: path.resolve(__dirname, './utils/escape.js')
  }
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
      process.stderr.write(`-*- ${e.message} -*-`);
      throw tracer.getBacktraceString();
    }
  };
}

module.exports = fiesta;
