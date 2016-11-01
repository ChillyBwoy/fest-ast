function festEach (v, getChildren) {
  return function (ast) {
    const x = v();
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
  };
}

function festFor (v, getChildren) {
  return function (ast) {
    const { attrs: { index, iterate, value }, children } = ast;
    const x = v();

    return `(function () {
      var ${x} = [], ${index}, ${value};
      for (${index} = 0; ${index} < ${iterate}.length; ${index}++) {
        ${value} = ${iterate}[${index}];
        ${x} = ${x}.concat([${getChildren(children)}]);
      }
      return ${x};
    }())`;
  };
}

function festIf (v, getChildren) {
  return function (ast) {
    const { type, children, attrs: { test } } = ast;
    if (!test) {
      throw new Error(`Invalid expression for "fest:if": ${test}`);
    }
    return `(function () {
      if (${test}) {
        return [${getChildren(children)}];
      } else {
        return null;
      }
    }())`;
  };
}

module.exports = {
  festEach,
  festFor,
  festIf
};
