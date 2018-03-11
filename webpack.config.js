const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin({ filename: 'bundle.css' });

module.exports = {
  context: __dirname,
  entry: './src',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [ 'css-loader' ]
        })
      }
    ],
  },
  plugins: [
    extractCSS,
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
    }),
    new CopyWebpackPlugin([
      './src/favicon.png',
      './src/favicon@2x.png',
      './src/favicon@3x.png',
      './src/favicon@4x.png',
      './src/manifest.json',
    ]),
  ],
}