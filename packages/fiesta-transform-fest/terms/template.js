/**
 * fest:template
 */
const FestValidator = require('../validator');

module.exports = (ast, { traverse }) => {
  let x = null;

  traverse(ast, node => {
    const { type, attrs, children } = node;
    if (type === 'fest:template') {
      if (x !== null) {
        throw new Error('multiple "fest:template" declarations');
      }
      const validator = new FestValidator(node);
      validator.allExceptChildren([
        'fest:params',
        'fest:param',
        'fest:attributes',
        'fest:attribute'
      ]);
      x = {
        type: '#root',
        attrs,
        children
      };
    }
    return node;
  });

  return x;
};
