/**
 * Служит для вывода пробела. Необходим в тех случаях, когда пробел
 * в тектовом узле удаляется при компиляции, например:
 *
 * ```xml
 * Hello,<fest:space/><fest:value>json.name</fest:value>!<!-- Hello, John! -->
 * ```
 */
const { Validator } = require('@mrgm/fiesta-core');

function festSpace() {
  return {
    name: 'fest:space',
    transform(ast, tree) {
      return tree.getNodeBy(node => {
        const { type } = node;
        if (type === 'fest:space') {
          const validator = new Validator(node);
          validator.noChildren();
          return {
            type: '#text',
            attrs: {},
            children: ' '
          };
        }
        return node;
      }, ast);
    }
  };
}

module.exports = festSpace;
