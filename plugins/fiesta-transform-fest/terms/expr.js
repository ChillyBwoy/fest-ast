function festEach(getVar, getNode, getChildren) {
  return (ast) => {
    const result = getVar();
    const { attrs: { index, iterate, value }, children } = ast;

    return `(function () {
      var ${result} = [], ${index}, ${value};
      for (${index} in ${iterate}) {
        if (${iterate}.hasOwnProperty(${index})) {
          ${value} = ${iterate}[${index}];
          ${result}.push([${getChildren(children)}]);
        }
      }
      return ${result};
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
    const result = getVar();
    return `(function () {
      var ${result} = [];
      if (${test}) {
        ${result}.push(${getChildren(children)});
      };
      return ${result};
    }())`;
  };
}

module.exports = {
  festEach,
  festFor,
  festIf
};
