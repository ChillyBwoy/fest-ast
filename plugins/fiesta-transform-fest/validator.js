/**
 * Валидатор для отдельно взятого терма
 * @param  {AST} ast
 * @return {[type]}     [description]
 */

function validate(ast) {
  const { type, children } = ast;
  const childTypes = Array.isArray(children) ? children.map(c => c.type) : ['#text'];

  function countChildren(types) {
    return types.reduce((acc, name) => {
      if (!acc[name]) {
        acc[name] = 0;
      }
      acc[name] += 1
      return acc;
    }, {});
  }

  return {
    hasChildren(rules = {}) {
      const counted = countChildren(childTypes);

      Object.keys(rules).forEach(tagName => {
        const rule = rules[tagName];
        if (rule.required) {
          if (!counted[tagName] || counted[tagName] === 0) {
            throw new Error(`"${tagName}" not found in "${type}"`);
          }
        }

        if (rule.min) {
          if (counted[tagName] && counted[tagName] < rule.min) {
            throw new Error(`Count of "${tagName}" is less than ${rule.min}`);
          }
        }

        if (rule.max) {
          if (counted[tagName] && counted[tagName] > rule.max) {
            throw new Error(`Count of "${tagName}" is greater than ${rule.min}`);
          }
        }
      });
    },

    mustChildren(types = []) {
      if (types.length === 0) {
        throw new Error(`no children found inside "${type}"`);
      }
    },

    allExceptChildren(types = []) {
      // можно любые типы
      if (types.length === 0) {
        return;
      }

      // кроме
      types.forEach(t => {
        if (childTypes.indexOf(t) !== -1) {
          throw new Error(`"${t}" inside "${type}"`);
        }
      });
    },

    onlyChildren(types = []) {
      // нельзя никакие
      if (types.length === 0) {
        return;
      }

      types.forEach(t => {
        if (childTypes.indexOf(t) === -1) {
          throw new Error(`"${t}" inside "${type}"`);
        }
      });
    },

    noChildren() {
      // нельзя никакие
      if (childTypes.length !== 0) {
        throw new Error('should not contain children');
      }
    }
  };
}

module.exports = {
  validate
};
