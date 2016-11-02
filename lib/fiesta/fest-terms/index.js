const { festTemplate, festValue } = require('./data');
const { festEach, festFor, festIf } = require('./expr');

function notImplemented (ast) {
  throw new Error(`Method "${ast.type}" not implemented yet`);
}

module.exports = function factory (getVar, getChildren) {
  const methods = {
    // Данные и вывод
    'fest:template': festTemplate(getVar, getChildren),
    'fest:value': festValue(getVar, getChildren),

    'fest:var': (ast) => notImplemented,
    'fest:text': (ast) => notImplemented,
    'fest:space': (ast) => notImplemented,
    'fest:set': (ast) => notImplemented,
    'fest:get': (ast) => notImplemented,
    'fest:element': (ast) => notImplemented,

    'fest:attributes': (ast) => notImplemented,
    'fest:attribute': (ast) => notImplemented,

    // Управляющие конструкции

    'fest:each': festEach(getVar, getChildren),
    'fest:for': festFor(getVar, getChildren),

    'fest:if': festIf(getVar, getChildren),

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
};
