const FestValidator = require('../validator');

function festTemplate(getVar, getNode) {
  return (ast) => {
    const validator = new FestValidator(ast);
    validator.allExceptChildren([
      'fest:params',
      'fest:param',
      'fest:attributes',
      'fest:attribute'
    ]);
    const { attrs: { context_name }, children } = ast;
    const root = getNode({
      type: '#root',
      attrs: {},
      children
    });
    return `function (${context_name ? context_name : ''}) {
      return ${root};
    };
    `;
  };
}

function festValue() {
  return ({ children }) => {
    return `('' + (${children}))`;
  };
}

function festSet(getVar, getNode, getChildren, onVisit) {
  return (ast) => {
    const validator = new FestValidator(ast);
    validator.allExceptChildren([
      'fest:params',
      'fest:param',
      'fest:attributes',
      'fest:attribute'
    ]);
    const { attrs, children } = ast;
    return onVisit(storage => {
      const node = {
        type: '#fragment',
        attrs: {},
        children
      };
      storage.addItem(attrs.name, `function (params) {return [${getNode(node)}];}`);
    });
  };
}

function festGet(getVar) {
  return (ast) => {
    const validator = new FestValidator(ast);
    validator.onlyChildren(['fest:params']);
    const { attrs: { name } } = ast;
    return `${getVar('templates')}['${name}']({})`;
  };
}

function festSpace() {
  return (ast) => {
    const validator = new FestValidator(ast);
    validator.noChildren();
    const space = ' ';
    return `'${space}'`;
  };
}

function festText() {
  return ({ children }) => {
    // на стороне парсера
    return {
      type: '#text',
      attrs: {},
      children
    };
  };
}

function festElement() {
  return ({ attrs, children }) => {
    return {
      type: attrs.name,
      attrs,
      children
    };
  };
}

function festAttributes() {
  return (ast) => {
    const validator = new FestValidator(ast);
    validator.onlyChildren([
      'fest:attribute',
      'fest:each',
      'fest:choose',
      'fest:for',
      'fest:if'
    ]);
    return ast;
  };
}

function festAttribute(getVar, getNode, getChildren) {
  return (ast) => {
    const { children, attrs: { name, value } } = ast;
    if (!name) {
      throw new Error('Invalid name expression for "fest:attribute"');
    }

    const validator = new FestValidator(ast);
    validator.onlyChildren([
      '#text',
      '#comment',
      'fest:text',
      'fest:each',
      'fest:choose',
      'fest:for',
      'fest:if'
    ]);

    return {
      type: '#attribute',
      attrs: {
        name,
        value: value ? value : getChildren(children).join('+')
      },
      children: []
    };
  };
}

module.exports = {
  festTemplate,
  festValue,
  festSet,
  festGet,
  festSpace,
  festText,
  festElement,
  festAttributes,
  festAttribute
};
