const crypto = require('crypto');
const Tracer = require('pegjs-backtrace');

const parser = require('../parser');
const { stringify } = require('../utils/string');
const render = require('./render');

let _varCount = 0;
const TOKEN = crypto.randomBytes(4).toString('hex');
const FUNC_NAME = `f$${TOKEN}`;
const getVar = (name) => `v$${TOKEN}_${(name ? name : ++_varCount)}`;

module.exports = function (tpl) {
  const tracer = new Tracer(tpl, {});
  let ast, tracerErrors;

  return {
    asFunction(opts = {}) {
      try {
        const renderer = render.asFunction(FUNC_NAME, getVar);
        const ast = parser.parse(tpl, {tracer});
        return renderer(ast);
      } catch (e) {
        if (opts.trace) {
          return tracer.getBacktraceString();
        }
        throw e;
      }
    },
    asString(opts = {}) {
      try {
        const ast = parser.parse(tpl, {tracer});
        return stringify(ast);
      } catch (e) {
        if (opts.trace) {
          return tracer.getBacktraceString();
        }
        throw e;
      }

    }
  };

};
