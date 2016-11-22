const { Validator } = require('@mrgm/fiesta-core');

const TERM_NAME = 'fest:template';
/**
 * Шаблоны представляют собой XML документы, содержащие HTML, текстовые данные
 * и управляющие конструкции. Шаблон задается парным элементом <fest:template>
 * (с указанием пространства имен http://fest.mail.ru). Например:
 *
 * ```xml
 * <fest:template xmlns:fest="http://fest.mail.ru">
 *     Hello!
 * </fest:template>
 * ```
 *
 * Данные передаваемые в шаблон, доступны через переменную с именем,
 * указанным в атрибуте context_name элемента fest:template:
 *
 * ```xml
 * <fest:template xmlns:fest="http://fest.mail.ru" context_name="json">
 *     Hello, <fest:value>json.name</fest:value>!
 * </fest:template>
 * ```
 *
 * Чтобы посмотреть результат работы, приведенных выше шаблонов, необходимо
 * воспользоваться встроенной утилитой fest-render или API библиотеки.
 */
function festTemplate() {
  return {
    name: TERM_NAME,
    transform(ast, tree) {
      let x = null;

      tree.getNodeBy(node => {
        const { type } = node;
        if (type === TERM_NAME) {
          if (x !== null) {
            throw new Error(`multiple ${TERM_NAME} declarations`);
          }
          const validator = new Validator(node);
          validator.allExceptChildren([
            'fest:params',
            'fest:param',
            'fest:attributes',
            'fest:attribute'
          ]);
          x = node;
        }
        return node;
      }, ast);

      return x;
    },

    // stringify(ast, stringifier) {
    //
    // }
  };
}

module.exports = festTemplate;
