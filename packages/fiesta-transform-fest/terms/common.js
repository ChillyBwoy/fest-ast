function festComment() {
  return ({ children }) => {
    return {
      type: '#comment',
      attrs: {},
      children
    };
  };
}

module.exports = {
  festComment
};
