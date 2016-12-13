var path = require('path');

module.exports = {
  context: path.resolve('test'),
  entry: {
    index: './index.js',
    reducer: './reducer.js'
  },
  output: {
    path: path.resolve('test/dist'),
    filename: '[name].js'
  },

  resolve: {
    alias: {
      'react-redux-spinner': path.join(__dirname, 'test', 'reactReduxSpinner')
    }
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
