const _template = require('./template');
const _element = require('./element');
const _value = require('./value');
const _space = require('./space');
const _if = require('./if');
const _set = require('./set');

module.exports = {
  terms: [
    _template,
    _element,
    _value,
    _space,
    _if,
    _set
  ],
  allowed: [
    // Данные и вывод
    'fest:template',
    'fest:value',

    'fest:text',
    'fest:space',
    'fest:set',
    'fest:get',
    'fest:element',
    'fest:insert',
    'fest:attributes',
    'fest:attribute',

    'fest:params',
    'fest:param',

    // Управляющие конструкции
    'fest:each',
    'fest:for',
    'fest:if',

    'fest:choose',

    // Остальные конструкции
    'fest:cdata',
    'fest:comment',
    'fest:doctype',

    // досвидос, сраный рассадник багов
    'fest:include',
    'fest:var',
    'fest:script',

    // расширения
    'fest:then',
    'fest:else'
  ]
};

// const terms = (traverse) => {
//   return {
//     'fest:template': () => {
//       /**
//        * allow all except
//        *
//        * 'fest:params',
//        * 'fest:param',
//        * 'fest:attributes',
//        * 'fest:attribute'
//        */
//     },
//
//     'fest:comment': () => (ast) => {
//       return ast;
//     },
//
//     'fest:value': () => (ast) => {
//       return ast;
//     },
//
//     'fest:set': () => (ast) => {
//       return ast;
//     },
//
//     'fest:get': () => (ast) => {
//       return ast;
//     },
//
//     'fest:space': () => (ast) => {
//       return ast;
//     },
//
//     'fest:text': () => (ast) => {
//       return ast;
//     },
//
//     'fest:element': () => (ast) => {
//       return ast;
//     }
//   };
// };
// module.exports = terms;
