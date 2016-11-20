const festTemplate = require('./template');

module.exports = [
  festTemplate
];

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
