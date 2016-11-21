const { Validator } = require('@mrgm/fiesta-core');

/**
 * fest:set
 *
 * Объявляет именованный подшаблон. Содержимое fest:set не будет выполнено
 * до тех пор, пока не будет вызван блок с таким же имененем
 * с помощью fest:get.
 *
 * ```xml
 * <fest:set name="name">John</fest:set>
 * <fest:set name="full_name">
 *     <fest:get name="name"/><fest:space/>F. Kennedy
 * </fest:set>
 * ```
 *
 * Для fest:set можно использовать атрибут test. Операция выполнится,
 * если его значение (JavaScript выражение) истинно.
 *
 * ```xml
 * <fest:set name="name" test="false">should not be set</fest:set>
 * ```
 *
 * Внутри fest:set доступен контекст params, передаваемый через fest:get.
 *
 * ```xml
 * <fest:set name="line">
 *     Hello,<fest:space/><fest:value>params.username</fest:value>!
 * </fest:set>
 * <fest:get name="line">{username: "John"}</fest:get><!-- Hello, John! -->
 * ```
 */

const TERM_NAME = 'fest:set';

function festSet() {
  return {
    name: TERM_NAME,
    transform(ast, tree) {
      return tree.getNodeBy(node => {
        const { type, children } = node;
        if (type === TERM_NAME) {
          const validator = new Validator(node);
          validator.allExceptChildren([
            'fest:params',
            'fest:param',
            'fest:attributes',
            'fest:attribute',
            'fest:then'
          ]);

          tree.getNodeBy(n => {
            if (n.type === TERM_NAME) {
              throw new Error('"fest:set" cannot be defined in another "fest:set" or "fest:param"');
            }
            return n;
          }, { children });
        }
        return node;
      }, ast);
    }
  };
}

module.exports = festSet;
