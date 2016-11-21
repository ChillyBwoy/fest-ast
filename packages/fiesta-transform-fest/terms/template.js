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
const { Validator } = require('@mrgm/fiesta-core');

function festTemplate() {
  return {
    name: 'fest:template',
    transform({ traverse }) {
      let x = null;

      traverse(node => {
        const { type, attrs, children } = node;
        if (type === 'fest:template') {
          if (x !== null) {
            throw new Error('multiple "fest:template" declarations');
          }
          const validator = new Validator(node);
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
    }
  };
}

module.exports = festTemplate;
