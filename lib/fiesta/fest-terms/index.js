const { festTemplate, festValue } = require('./data');
const { festEach, festFor, festIf } = require('./expr');

function notImplemented (ast) {
  throw new Error(`Method "${ast.type}" not implemented yet`);
}

function factory (f, getChildren) {
  let _varCount = 0;
  const _var = () => `${f}$var${++_varCount}`;

  const methods = {
    // Данные и вывод
    'fest:template': festTemplate(_var, getChildren),
    'fest:value': festValue(_var, getChildren),

    'fest:var': (ast) => notImplemented,
    'fest:text': (ast) => notImplemented,
    'fest:space': (ast) => notImplemented,
    'fest:set': (ast) => notImplemented,
    'fest:get': (ast) => notImplemented,
    'fest:element': (ast) => notImplemented,

    'fest:attributes': (ast) => notImplemented,
    'fest:attribute': (ast) => notImplemented,

    // Управляющие конструкции

    'fest:each': festEach(_var, getChildren),
    'fest:for': festFor(_var, getChildren),

    'fest:if': festIf(_var, getChildren),

    'fest:choose': (ast) => notImplemented,
    'fest:when': (ast) => notImplemented,
    'fest:otherwise': (ast) => notImplemented,

    // Остальные конструкции

    'fest:cdata': (ast) => notImplemented,
    'fest:comment': (ast) => notImplemented,
    'fest:doctype': (ast) => notImplemented,
    'fest:script': (ast) => notImplemented,
    'fest:include': (ast) => notImplemented,
    'fest:insert': (ast) => notImplemented
  };

  return function (ast) {
    const { type } = ast;

    if (methods[type]) {
      return methods[type](ast);
    } else {
      return ast;
    }
  };
}

module.exports = {
  factory
};
