const { Validator } = require('@mrgm/fiesta-core');
/**
 * fest:if
 *
 * Условный оператор.
 *
 * ```xml
 * <fest:if test="true">
 *   <fest:then>It's true!</fest:then>
 * </fest:if>
 * <fest:if test="true">
 *   <fest:then>It's true!</fest:then>
 *   <fest:else>It's false!</fest:else>
 * </fest:if>
 * ```
 */
function festIf() {
  return {
    name: 'fest:if',
    transform(ast, tree) {
      return tree.getNodeBy(node => {
        const { type, attrs } = node;
        if (type === 'fest:if') {
          const validator = new Validator(node);
          validator
            .onlyChildren(['fest:then', 'fest:else'])
            .hasChildren({
              'fest:then': { required: true, max: 1 },
              'fest:else': { max: 1 }
            });
          const { test } = attrs;
          if (typeof test !== 'string') {
            throw new Error('test attribute is required for "fest:if"');
          }
        }
        return node;
      }, ast);
    }
  };
}

module.exports = festIf;
