/**
 * Валидатор для отдельно взятого терма
 * @param  {AST} ast
 * @return {[type]}     [description]
 */

function countTypes(types) {
  return types.reduce((acc, name) => {
    if (!acc[name]) {
      acc[name] = 0;
    }
    acc[name] += 1;
    return acc;
  }, {});
}

function getTypes(data) {
  return Array.isArray(data) ? data.map(c => c.type) : ['#text'];
}

class Validator {
  constructor({ type, attrs, children }) {
    this._type = type;
    this._attrs = attrs;
    this._children = children;

    this._childTypes = getTypes(children);
    this._childCounted = countTypes(this._childTypes);
  }

  /**
   * Проверяет наличие дочерних узлов на наличие, мин/макс
   */
  hasChildren(rules = {}) {
    Object.keys(rules).forEach(tagName => {
      const rule = rules[tagName];
      if (rule.required) {
        if (!this._childCounted[tagName] || this._childCounted[tagName] === 0) {
          throw new Error(`"${tagName}" not found in "${this._type}"`);
        }
      }

      if (rule.min) {
        if (this._childCounted[tagName] && this._childCounted[tagName] < rule.min) {
          throw new Error(`Count of "${tagName}" is less than ${rule.min}`);
        }
      }

      if (rule.max) {
        if (this._childCounted[tagName] && this._childCounted[tagName] > rule.max) {
          throw new Error(`Count of "${tagName}" is greater than ${rule.min}`);
        }
      }
    });
    return this;
  }

  mustChildren(types = []) {
    if (types.length === 0) {
      throw new Error(`no children found inside "${this._type}"`);
    }
    return this;
  }

  allExceptChildren(types = []) {
    // можно любые типы
    if (types.length === 0) {
      return this;
    }

    // кроме
    types.forEach(t => {
      if (this._childTypes.indexOf(t) !== -1) {
        throw new Error(`"${t}" inside "${this._type}"`);
      }
    });

    return this;
  }

  onlyChildren(types = []) {
    // нельзя никакие
    if (types.length === 0 || this._children.length === 0) {
      return this;
    }

    this._childTypes.forEach(ct => {
      if (types.indexOf(ct) === -1) {
        throw new Error(`"${ct}" found inside "${this._type}".\r\nAllowed types: {${types.join(', ')}}`);
      }
    });
    return this;
  }

  noChildren() {
    // нельзя никакие
    if (this._childTypes.length !== 0) {
      throw new Error('should not contain children');
    }
    return this;
  }
}

module.exports = Validator;
