const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const VENDORS = [
// ];

module.exports = {
  entry: {
    bundle: './src/js/index.js',
    // vendor: VENDORS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react'], plugins: ["transform-decorators-legacy", "transform-class-properties"] }
      },
      {
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        test: /\.css$/
      },
      {
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ 'css-loader', 'resolve-url-loader', 'postcss-loader', 'sass-loader']
        }),
        test: /\.scss$/
      },
      {
        use : 'file-loader?name=[path]/[name].[ext]',
        test: /\.(otf|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/
      },
      {
        use: "file-loader",
        test: /\.(jpe?g|png|gif|svg|mp4)$/
      }
    ]
  },
  plugins: [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin({
        filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
      hash: false,
      minify: {
        removeCommits: true,
        collapseWhitespace: false
      }
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor', 'manifest']
    // }),
    new ExtractTextPlugin({
        filename: 'style.css'
    }),
    new CopyWebpackPlugin([
        // { from: './src/images', to: './images'},
        // { from: './src/fonts', to: './fonts'},
    ], {
        ignore: ['*.scss', '.DS_Store']
    })
  ],
};
