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
// const { Validator } = require('@mrgm/fiesta-core');

module.exports = {
  name: 'fest:value',
  transform(ast, { traverse }) {
    return traverse(ast, node => {
      const { type, children } = node;
      return node;
    });
  }
};
