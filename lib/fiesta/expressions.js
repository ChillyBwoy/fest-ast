let fiestaVar = 0;

const v = () => `_$var${++fiestaVar}`;

function getGrammarExpressions (astChildren) {
  return {
    value(n) {
      return `${n.children.map(item => item.toString()).join('')}`;
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
      const x = v();
      return `(function () {
        var ${x} = [], ${n.attrs.index}, ${n.attrs.value};
        for (${n.attrs.index} = 0; ${n.attrs.index} < ${n.attrs.iterate}.length; ${n.attrs.index}++) {
          ${n.attrs.value} = ${n.attrs.iterate}[${n.attrs.index}];
          ${x} = ${x}.concat([${astChildren(n.children)}]);
        }
        return ${x};
      }())`;
    },

    exprEach(n) {
      const x = v();
      return `(function () {
        var ${x} = [], ${n.attrs.index}, ${n.attrs.value};
        for (${n.attrs.index} in ${n.attrs.iterate}) {
          if (${n.attrs.iterate}.hasOwnProperty(${n.attrs.index})) {
            ${n.attrs.value} = ${n.attrs.iterate}[${n.attrs.index}];
            ${x} = ${x}.concat([${astChildren(n.children)}]);
          }
        }
        return ${x};
      }())`;
    },

    exprScript(n) {
      return `(function () {
        try {
          
        } catch (e) {
          throw e;
        }
        return null;
      }())`;
    }
  };
};

module.exports = {
  getGrammarExpressions
};
