function festComment(getVar, getNode, getChildren) {
  return (ast) => {
    ast.type = '#comment';
    return ast;
  };
}

module.exports = {
  festComment
};
