/**
 * fest:value
 *
 * Служит для вывода значения JavaScript выражения.
 * Поддерживаем 4 режима вывода: html (по умолчанию), text, js и json.
 *
 * ```xml
 * <fest:script><![CDATA[
 *     var value = '"<script/>"';
 * ]]></fest:script>
 * <fest:value>value</fest:value><!-- &quot;&lt;script/&gt;&quot; -->
 * <fest:value output="text">value</fest:value><!-- "<script/>" -->
 * <fest:value output="js">value</fest:value><!-- \"\u003Cscript\/\u003E\" -->
 * <fest:value output="json">value</fest:value><!-- "\"\u003Cscript/\u003E\"" -->
 * ```
 */
const { Validator } = require('@mrgm/fiesta-core');

function festValue() {
  return {
    name: 'fest:value',
    transform(ast, tree) {
      return tree.getNodeBy(node => {
        const { type, children } = node;
        if (type === 'fest:value') {
          const validator = new Validator(node);
          validator
            .onlyChildren(['#text'])
            .hasChildren({
              '#text': {
                required: true,
                max: 1
              }
            });

          const value = children[0].children;
          return {
            type: '#text',
            attrs: {},
            children: `{${value.trim()}}`
          };
        }
        return node;
      }, ast);
    }
  };
}

module.exports = festValue;
