const crypto = require('crypto');
const Tracer = require('pegjs-backtrace');

const parser = require('../parser');
const { stringify } = require('../utils/string');
const render = require('./render');

let _varCount = 0;
const TOKEN = crypto.randomBytes(4).toString('hex');
const FUNC_NAME = `f$${TOKEN}`;
const getVar = (name) => `v$${TOKEN}_${(name ? name : ++_varCount)}`;

function astWrap (ast) {
  if (ast.type !== 'fest:template') {
    throw new Error('invalid template');
  }
  const renderer = render.asFunction(FUNC_NAME, getVar);
  const { attrs: { context_name } } = ast;
  const repo = getVar('repo');

  return `function (${FUNC_NAME}) {
  var ${repo} = {};
  return function (${context_name ? context_name : ''}) {
    return ${renderer(ast)};
  };
};`;
}

module.exports = function (tpl) {
  const tracer = new Tracer(tpl, {});
  let ast, tracerErrors;

  return {
    asObject(opts = {}) {
      try {
        const ast = parser.parse(tpl, {tracer});
        return ast;
      } catch (e) {
        if (opts.trace) {
          return tracer.getBacktraceString();
        }
        throw e;
      }
    },
    asFunction(opts = {}) {
      try {
        const ast = parser.parse(tpl, {tracer});
        return astWrap(ast);
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
