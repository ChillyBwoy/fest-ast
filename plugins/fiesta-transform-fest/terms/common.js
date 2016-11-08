function festComment() {
  return (ast) => {
    const { children } = ast;
    return {
      type: '#comment',
      attrs: {},
      children: JSON.stringify(children)
    };
  };
}

module.exports = {
  festComment
};
