const { createCounter, createStorage } = require('./utils');
const { validate } = require('./validator');

const terms = require('./terms');

function notImplemented(ast) {
  throw new Error(`/* Method "${ast.type}" is not implemented yet */`);
}

function deprecated(ast) {
  throw new Error(`Method "${ast.type}" is deprecated`);
}

function term(...args) {
  return (t) => t(...args);
}

function plugin(token, getNode, getChildren) {
  const getVar = createCounter(token, 'v');
  const templateStorage = createStorage();

  function onVisit(v) {
    return v(templateStorage);
  }

  const t = term(getVar, getNode, getChildren, onVisit);
  const methods = {
    // Данные и вывод
    'fest:template': t(terms.festTemplate),
    'fest:value': t(terms.festValue),

    'fest:text': notImplemented,
    'fest:space': notImplemented,
    'fest:set': t(terms.festSet),
    'fest:get': t(terms.festGet),
    'fest:element': notImplemented,

    'fest:attributes': notImplemented,
    'fest:attribute': notImplemented,

    // Управляющие конструкции

    'fest:each': t(terms.festEach),
    'fest:for': t(terms.festFor),

    'fest:if': t(terms.festIf),

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

  return {
    prolog() {},
    getNode(ast) {
      const { type } = ast;

      if (methods[type]) {
        const v = validate(ast);
        return methods[type](ast, v);
      }

      return ast;
    }
  };
}

module.exports = plugin;
