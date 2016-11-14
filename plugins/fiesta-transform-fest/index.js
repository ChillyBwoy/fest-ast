const { createCounter, createStorage } = require('./utils');

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

    'fest:text': t(terms.festText),
    'fest:space': t(terms.festSpace),
    'fest:set': t(terms.festSet),
    'fest:get': t(terms.festGet),
    'fest:element': t(terms.festElement),

    // 'fest:attributes': t(terms.festAttributes),
    // 'fest:attribute': t(terms.festAttribute),

    'fest:params': notImplemented,
    'fest:param': notImplemented,

    // Управляющие конструкции
    'fest:each': t(terms.festEach),
    'fest:for': t(terms.festFor),
    'fest:if': t(terms.festIf),

    'fest:choose': t(terms.festChoose), // includes fest:when and fest:otherwise

    // Остальные конструкции
    'fest:cdata': notImplemented,
    'fest:comment': t(terms.festComment),
    'fest:doctype': notImplemented,

    // досвидос, сраный рассадник багов
    'fest:var': deprecated,
    'fest:include': deprecated,
    'fest:insert': deprecated,
    'fest:script': deprecated
  };

  return {
    getProlog() {
      return `// --- fest prolog ---
  var ${getVar('templates')} = ${templateStorage.getAll()};
  // --- end of fest prolog ---`;
    },

    getNode(ast) {
      const { type } = ast;

      if (methods[type]) {
        return methods[type](ast);
      }

      return ast;
    },
    name: 'fest'
  };
}

module.exports = plugin;
