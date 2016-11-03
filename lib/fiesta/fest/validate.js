const { FiestaParseError } = require('../error');

/**
 * Валидатор для отдельно взятого терма
 * @param  {AST} ast
 * @return {[type]}     [description]
 */

function validate(ast) {
  const { children } = ast;
  const childTypes = children.map(c => c.type);
  // const childTypesExcepts = ['#comment', '#cdata'];

  return {
    allExceptChildren(types = []) {
      // можно любые типы
      if (types.length === 0) {
        return true;
      }
      // кроме
      const matched = types.forEach(t => {
        if (childTypes.indexOf(t) !== -1) {
          throw new FiestaParseError(`"fest:set" can't handle "${t}" tag`);
        }
      });
    },
    mustChildren(types = []) {},
    onlyChildren(types = []) {
      // нельзя никакие
      if (types.length === 0) {
        return false;
      }
    }
  };
}

module.exports = {
  validate
};
