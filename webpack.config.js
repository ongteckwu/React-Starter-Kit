var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');

//presets
const TARGET = process.env.npm_lifecycle_event; //To know whether it is start or build
process.env.BABEL_ENV = TARGET; //To communicate with babelrc

//path uses nodeJS default path method
const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
}

const common = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6']
  },
  module: {
    loaders: [
    {
      test:/\.scss$/,
      exclude: /node_modules/,
      loaders: ['style', 'css', 'sass'],
      include: PATHS.app
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel'],
      include: PATHS.app
    }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: './index-template.html',
      index: 'index.html',
      title: 'TideApp',
      appMountId: 'app'
    })
  ]
}  

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      contentBase: 'build',
      stats: 'errors-only',

      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'eval-source-map'
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {})
}