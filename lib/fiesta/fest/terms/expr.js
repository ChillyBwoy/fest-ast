function festEach(getVar, getNode, getChildren) {
  return (ast) => {
    const x = getVar();
    const { attrs: { index, iterate, value }, children } = ast;
    return `(function () {
      var ${x} = [], ${index}, ${value};
      for (${index} in ${iterate}) {
        if (${iterate}.hasOwnProperty(${index})) {
          ${value} = ${iterate}[${index}];
          ${x}.push([${getChildren(children)}]);
        }
      }
      return ${x};
    }())`;
  };
}

function festFor(getVar, getNode, getChildren) {
  return (ast) => {
    const { attrs: { index, iterate, value }, children } = ast;
    const result = getVar();
    const size = getVar();

    return `(function () {
      var ${result} = [], ${size} = ${iterate}.length, ${index}, ${value};
      for (${index} = 0; ${index} < ${size}; ${index}++) {
        ${value} = ${iterate}[${index}];
        ${result}.push([${getChildren(children)}]);
      }
      return ${result};
    }())`;
  };
}

function festIf(getVar, getNode, getChildren) {
  return (ast) => {
    const { children, attrs: { test } } = ast;
    if (!test) {
      throw new Error(`Invalid expression for "fest:if": ${test}`);
    }
    const x = getVar();
    return `(function () {
      var ${x} = [];
      if (${test}) {
        ${x}.push(${getChildren(children)});
      };
      return ${x};
    }())`;
  };
}

module.exports = {
  festEach,
  festFor,
  festIf
};
