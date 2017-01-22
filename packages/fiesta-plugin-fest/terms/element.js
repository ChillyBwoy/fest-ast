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
    transform(ast, tree) {
      return tree.getNodeBy(node => {
        const { type, attrs, children } = node;

        if (type === 'fest:element') {
          const { name } = attrs;
          if (typeof name !== 'string') {
            throw new Error('name attribute is required for "fest:element"');
          }
          delete attrs.name;
          return {
            type: name,
            attrs,
            children
          };
        }
        return node;
      }, ast);
    }
  };
}

module.exports = festElement;
