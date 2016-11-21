const { Validator } = require('@mrgm/fiesta-core');

const TERM_NAME = 'fest:get';

function getExpr(value) {
  let nextValue;
  try {
    nextValue = value.replace(/;+\s*$/, '');
    const testFunc = (new Function(`(${nextValue})`));
  } catch (e) {
    throw new Error('invalid');
  }
  return value;
}


function festGet() {
  return {
    name: TERM_NAME,
    transform(ast, tree) {
      return tree.getNodeBy(node => {
        const { type } = node;
        if (type === TERM_NAME) {
          const validator = new Validator(node);
          validator.onlyChildren([
            'fest:params',
            'fest:param'
          ]);
        }
        return node;
      }, ast);
    }
  };
}

module.exports = festGet;
