function pass(ast, options) {}

const plugin = {
  use(config) {
    config.passes.transform.unshift(pass);
  }
};

module.exports = plugin;
