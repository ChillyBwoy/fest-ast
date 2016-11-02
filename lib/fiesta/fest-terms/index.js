const { festTemplate, festValue, festSet, festGet } = require('./data');
const { festEach, festFor, festIf } = require('./expr');

function notImplemented (ast) {
  throw new Error(`Method "${ast.type}" is not implemented yet`);
}

module.exports = function factory (getVar, getNode, getChildren, onVisit) {
  const methods = {
    // Данные и вывод
    'fest:template': festTemplate(getVar, getNode, getChildren),
    'fest:value': festValue(getVar, getNode, getChildren),

    'fest:var': notImplemented,
    'fest:text': notImplemented,
    'fest:space': notImplemented,
    'fest:set': festSet(getVar, getNode, getChildren, onVisit),
    'fest:get': festGet(getVar, getNode, getChildren, onVisit),
    'fest:element': notImplemented,

    'fest:attributes': notImplemented,
    'fest:attribute': notImplemented,

    // Управляющие конструкции

    'fest:each': festEach(getVar, getNode, getChildren),
    'fest:for': festFor(getVar, getNode, getChildren),

    'fest:if': festIf(getVar, getNode, getChildren),

    'fest:choose': notImplemented,
    'fest:when': notImplemented,
    'fest:otherwise': notImplemented,

    // Остальные конструкции

    'fest:cdata': notImplemented,
    'fest:comment': notImplemented,
    'fest:doctype': notImplemented,
    'fest:script': notImplemented,
    'fest:include': notImplemented,
    'fest:insert': notImplemented
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
