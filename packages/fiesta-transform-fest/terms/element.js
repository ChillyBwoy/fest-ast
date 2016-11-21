/**
 * fest:element
 *
 * Выводит HTML элемент с переменным именем.
 *
 * ```xml
 * <fest:element name="div" />
 * <fest:script>
 *     var variable = 'table';
 * </fest:script>
 * <fest:element select="variable">
 *     fest code
 * </fest:element>
 * <fest:element name="{variable2}">
 *     fest code
 * </fest:element>
 * ```
 */
function festElement() {
  return {
    name: 'fest:element',
    transform({ traverse }) {
      return traverse(node => {
        const { type, attrs, children } = node;

        if (type === 'fest:element') {
          if (typeof attrs.name !== 'string') {
            throw new Error('name attribute is required for "fest:element"');
          }
          return {
            type: attrs.name,
            attrs,
            children
          };
        }

        return node;
      });
    }
  };
}

module.exports = festElement;
