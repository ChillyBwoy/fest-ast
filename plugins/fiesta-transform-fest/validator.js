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
          throw new Error(`"fest:set" can't handle "${t}" tag`);
        }
      });
    },
    mustChildren(types = []) {},
    onlyChildren(types = []) {
      // нельзя никакие
      if (types.length === 0) {
        return;
      }
    },
    onlyOneChildrenOfType(type) {
      if (childTypes.length !== 1 && childTypes[0] !== type) {
        throw new Error('"fest:value" should contain single #text element');
      }
    }
  };
}

module.exports = {
  validate
};
