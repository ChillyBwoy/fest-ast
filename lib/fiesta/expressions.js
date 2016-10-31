function getGrammarExpressions (astChildren) {
  return {
    value(n) {
      return `${n.children.map(item => item.toString()).join('')}`;
    },

    attributes(n) {
      return astChildren(n.children);
    },

    exprIf(n) {
      return `(function () {
        if (${n.attrs.test}) {
          return ${astChildren(n.children)};
        } else {
          return null;
        }
      }())`;
    },

    exprFor(n) {
      return `(function () {
        var _$a = [], ${n.attrs.index}, ${n.attrs.value};
        for (${n.attrs.index} = 0; ${n.attrs.index} < ${n.attrs.iterate}.length; ${n.attrs.index}++) {
          ${n.attrs.value} = ${n.attrs.iterate}[${n.attrs.index}];
          _$a = _$a.concat([${astChildren(n.children)}]);
        }
        return _$a;
      }())`;
    },

    exprEach(n) {
      return `(function () {
        var _$a = [], ${n.attrs.index}, ${n.attrs.value};
        for (${n.attrs.index} in ${n.attrs.iterate}) {
          if (${n.attrs.iterate}.hasOwnProperty(${n.attrs.index})) {
            ${n.attrs.value} = ${n.attrs.iterate}[${n.attrs.index}];
            _$a = _$a.concat([${astChildren(n.children)}]);
          }
        }
        return _$a;
      }())`;
    }
  };
};

module.exports = {
  getGrammarExpressions
};
