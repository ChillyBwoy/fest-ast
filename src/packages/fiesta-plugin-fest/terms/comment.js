const TERM_NAME = 'fest:comment';

/**
 * fest:comment
 *
 * Выводит HTML комментарий.
 *
 * ```xml
 * <fest:comment>comment</fest:comment>
 * ```
 */
function festComment() {
  return {
    name: 'fest:element',
    transform(ast, tree) {
      return tree.getNodeBy(node => {
        const { type, attrs, children } = node;
        if (type === TERM_NAME) {
          return {
            type: '#comment',
            attrs,
            children
          };
        }
        return node;
      }, ast);
    }
  };
}

module.exports = festComment;
