function festEach(getVar, getNode, getChildren) {
  return (ast) => {
    const result = getVar();
    const { attrs: { index, iterate, value }, children } = ast;

    return `(function () {
      var ${result} = [], ${index}, ${value};
      for (${index} in ${iterate}) {
        if (${iterate}.hasOwnProperty(${index})) {
          ${value} = ${iterate}[${index}];
          ${result}.push(${getChildren(children)});
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
        ${result}.push(${getChildren(children)});
      }
      return ${result};
    }())`;
  };
}

function festIf(getVar, getNode, getChildren) {
  return (ast) => {
    const { children, attrs: { test } } = ast;
    if (!test) {
      throw new Error(`Invalid expression for "fest:if": "${test}"`);
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

function festChoose(getVar, getNode, getChildren) {
  const passOtherwise = (result, { children }) => {
    return ` else {
      ${result}.push(${getChildren(children)});
    }`;
  };

  const passWhen = (result, { children, attrs: { test } }) => {
    if (!test) {
      throw new Error(`Invalid expression for "fest:when": "${test}"`);
    }
    return `if (${test}) {
      ${result}.push(${getChildren(children)});
    }`;
  };

  return (ast, v) => {
    const { children } = ast;
    v.hasChildren({
      'fest:when': { min: 1, max: Infinity, required: true },
      'fest:otherwise': { max: 1 }
    });

    const result = getVar();
    const whens = children.filter(c => c.type === 'fest:when');
    const otherwise = children.filter(c => c.type === 'fest:otherwise')[0];

    return `(function () {
      var ${result} = [];
      ${whens.map(w => passWhen(result, w)).join(' else ')}${otherwise ? passOtherwise(result, otherwise) : ''}
      return ${result};
    }())`;
  };
}

module.exports = {
  festEach,
  festFor,
  festIf,
  festChoose
};
