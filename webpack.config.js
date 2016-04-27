var path = require('path');

module.exports = {
  context: path.resolve('src'),
  entry: './index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'semistandard'
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
