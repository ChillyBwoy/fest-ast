// const crypto = require('crypto');
// const TOKEN = crypto.randomBytes(4).toString('hex');

class Transformer {
  constructor(plugins) {
    this._plugins = plugins.map(PluginClass => new PluginClass());
  }

  applyPluginsTo(ast) {
    return this._plugins.reduce((r, p) => p.transform(r), ast);
  }
}

module.exports = Transformer;
