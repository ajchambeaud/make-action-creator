var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.resolve('src'),
  entry: {
    index: './index.js',
    reducer: './reducer.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    library: 'MakeActionCreator',
    libraryTarget: 'umd'
  },
  externals: {
    'react-redux-spinner': 'react-redux-spinner'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  ]
};
