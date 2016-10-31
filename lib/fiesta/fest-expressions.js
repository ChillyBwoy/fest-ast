let _varCount = 0;
const _var = () => `$v${++_varCount}`;

function factory (f, getNode, getChildren) {
  const methods = {
    'fest:value': (ast) => {
      const { children } = ast;
      return `${children.map(item => item.toString()).join('')}`;
    },

    'fest:if': (ast) => {
      const { attrs, children } = ast;
      return `(function () {
        if (${attrs.test}) {
          return ${getChildren(children)};
        } else {
          return null;
        }
      }())`;
    },

    'fest:for': (ast) => {
      const { attrs: { index, iterate, value }, children } = ast;
      const x = _var();

      return `(function () {
        var ${x} = [], ${index}, ${value};
        for (${index} = 0; ${index} < ${iterate}.length; ${index}++) {
          ${value} = ${iterate}[${index}];
          ${x} = ${x}.concat([${getChildren(children)}]);
        }
        return ${x};
      }())`;
    },

    'fest:each': (ast) => {
      const x = _var();
      const { attrs: { index, iterate, value }, children } = ast;

      return `(function () {
        var ${x} = [], ${index}, ${value};
        for (${index} in ${iterate}) {
          if (${iterate}.hasOwnProperty(${index})) {
            ${value} = ${iterate}[${index}];
            ${x} = ${x}.concat([${getChildren(children)}]);
          }
        }
        return ${x};
      }())`;
    }
  };

  return function (ast) {
    const { node: { scope, name } } = ast;
    const exprName = `${scope}:${name}`;

    if (!methods[exprName]) {
      throw new Error(`Unknown fest tag: "${scope}:${name}"`);
    }
    return methods[exprName];
  };
}

module.exports = {
  factory
};
