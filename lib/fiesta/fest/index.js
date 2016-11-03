const { festTemplate, festValue, festSet, festGet } = require('./terms/data');
const { festEach, festFor, festIf } = require('./terms/expr');
const { validate } = require('./validate');

function notImplemented(ast) {
  throw new Error(`/* Method "${ast.type}" is not implemented yet */`);
}

function deprecated(ast) {
  throw new Error(`Method "${ast.type}" is deprecated`);
}

function term(...args) {
  return (t) => t(...args);
}

function festTermsFactory(getVar, getNode, getChildren, onVisit) {
  const t = term(getVar, getNode, getChildren, onVisit);

  const methods = {
    // Данные и вывод
    'fest:template': t(festTemplate),
    'fest:value': t(festValue),

    'fest:text': notImplemented,
    'fest:space': notImplemented,
    'fest:set': t(festSet),
    'fest:get': t(festGet),
    'fest:element': notImplemented,

    'fest:attributes': notImplemented,
    'fest:attribute': notImplemented,

    // Управляющие конструкции

    'fest:each': t(festEach),
    'fest:for': t(festFor),

    'fest:if': t(festIf),

    'fest:choose': notImplemented,
    'fest:when': notImplemented,
    'fest:otherwise': notImplemented,

    // Остальные конструкции
    'fest:cdata': notImplemented,
    'fest:comment': notImplemented,
    'fest:doctype': notImplemented,

    'fest:var': deprecated,
    'fest:include': deprecated,
    'fest:insert': deprecated,
    'fest:script': deprecated
  };

  return (ast) => {
    const { type } = ast;

    if (methods[type]) {
      const v = validate(ast);
      return methods[type](ast, v);
    }
    return ast;
  };
}

module.exports = {
  festTermsFactory
};
