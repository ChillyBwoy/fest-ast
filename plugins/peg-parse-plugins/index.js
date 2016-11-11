function pass(ast, options) {
  // console.log(options);
  // console.log(JSON.stringify(ast, null, 2));
  // console.log('=========');
}

const plugin = {
  use(config) {
    config.passes.transform.unshift(pass);
  }
};

module.exports = plugin;
