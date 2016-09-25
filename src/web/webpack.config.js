var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: {
    'app': './assets/app/components/Routes',
    'store': 'bootstrap-webpack!./bootstrap.config.js'
  },
  output: {
      path: path.resolve('./assets/bundles/'),
      // filename: "[name]-[hash].js",
      // sourceMapFilename: '[name]-[hash].js.map',
      filename: "[name].js",
      sourceMapFilename: '[name].js.map',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: path.resolve('./assets/app/'),
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }, {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: path.resolve('./assets/app/'),
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
  ]
}