#!/usr/bin/env node

const fs = require('fs');
const parser = require('../lib/parser');
const crypto = require('crypto');
const Tracer = require('pegjs-backtrace');
const { astAsFuncs } = require('../lib/fiesta');

function astWrap (ast) {
  const S = crypto.randomBytes(4).toString('hex');
  const FUNC_NAME = `ast$${S}`;

  if (ast.type !== 'fest:template') {
    throw new Error('invalid template');
  }
  const { attrs: { context_name } } = ast;

  return `module.exports = function (${FUNC_NAME}) {
  return function (${context_name ? context_name : ''}) {
    return ${astAsFuncs(ast, FUNC_NAME)};
  };
};`;
}

function compile (tplPath, opts = {}) {
  const tpl = fs.readFileSync(tplPath, 'utf8');
  const tracer = new Tracer(tpl, {
  });

  try {
    const ast = parser.parse(tpl, {tracer});
    if (opts.wrapInFunc) {
      process.stdout.write(astWrap(ast));
    } else {
      process.stdout.write(`module.exports = ${JSON.stringify(ast)}`);
    }
  } catch (e) {
    process.stderr.write(tracer.getBacktraceString());
  }
}

const [template, ...args] = process.argv.slice(2);

if (template) {
  compile(template, {
    wrapInFunc: args.indexOf('-f') !== -1
  });
}
