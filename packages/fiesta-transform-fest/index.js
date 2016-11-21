const terms = require('./terms');

function plugin() {
  return {
    name: 'fest',
    transform(tree) {
      let result;
      for (const term of terms) {
        result = term.transform(tree);
      }
      return result;
    }

    // transform({ traverse }) {
    //   let x = null;
    //
    //   traverse(node => {
    //     console.log('==>', node.type);
    //     const { type, attrs, children } = node;
    //     if (type === 'fest:template') {
    //       if (x !== null) {
    //         throw new Error('multiple "fest:template" declarations');
    //       }
    //       const validator = new FestValidator(node);
    //       validator.allExceptChildren([
    //         'fest:params',
    //         'fest:param',
    //         'fest:attributes',
    //         'fest:attribute'
    //       ]);
    //       x = {
    //         type: '#root',
    //         attrs,
    //         children
    //       };
    //     }
    //     return node;
    //   });
    //
    //   traverse(node => {
    //     console.log('-->', node.type);
    //     return node;
    //   });
    //
    //   return x;
    // }


    // transform({ traverse }) {
    //   return terms.reduce((tree, t) => {
    //     return t.transform(tree, methods);
    //   }, ast);
    // }
  };
}

module.exports = terms;
