var path = require('path');

module.exports = {
  context: path.resolve('test'),
  entry: './index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'test.js'
  },

  resolve: {
    alias: {
      'react-redux-spinner': path.join(__dirname, 'test', 'reactReduxSpinner')
    }
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
