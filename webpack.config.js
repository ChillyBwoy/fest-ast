const path = require('path');

const config = {
  debug: true,
  devtool: 'source-map',
  entry: {
    app: './src/app.js',
    cito: './src/cito.js',
    vdom: './src/vdom.js',
  },
  output: {
    filename: '[name].js',
    publicPath: '/bundles/',
    path: path.resolve(__dirname, './bundles')
  },
  resolve: {
    extensions: ['', '.js']
  },
  node: {
    global: false
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel'
      }
    ]
  },
  devServer: {
    progress: true,
    contentBase: path.join(__dirname, 'public'),
    filename: 'app.js',
    stats: {
      colors: true
    }
  }
};

module.exports = config;
