/**
 * Валидатор для отдельно взятого терма
 * @param  {AST} ast
 * @return {[type]}     [description]
 */

function validate(ast) {
  const { children } = ast;
  const childTypes = children.map(c => c.type);

  return {
    allExceptChildren(types = []) {
      // можно любые типы
      if (types.length === 0) {
        return;
      }
      // кроме
      types.forEach(t => {
        if (childTypes.indexOf(t) !== -1) {
          throw new Error(`can't handle "${t}" tag`);
        }
      });
    },
    mustChildren() {},
    onlyChildren(types = []) {
      // нельзя никакие
      if (types.length === 0) {
        return;
      }
    },
    noChildren() {
      // нельзя никакие
      if (childTypes.length !== 0) {
        throw new Error('should not contain children');
      }
    },
    onlyOneChildrenOfType(type) {
      if (childTypes.length !== 1 && childTypes[0] !== type) {
        throw new Error(`should contain only one child of type "${type}" element`);
      }
    }
  };
}

module.exports = {
  validate
};
