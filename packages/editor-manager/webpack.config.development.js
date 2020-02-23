const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = {
  managerSrc: path.resolve(__dirname, 'src/index.js'),
  previewSrc: path.resolve(__dirname, '../editor/src/index.js'),
  managerHtml: path.resolve(__dirname, 'src/index.html'),
  previewHtml: path.resolve(__dirname, '../editor/src/index.html'),
  favicon: path.resolve(__dirname, 'src/favicon.ico'),
  node_modules: path.resolve(__dirname, 'node_modules'),
  root_node_modules: path.resolve(__dirname, '../../node_modules'),
};

module.exports = ({ templatesDirectory }) => ({
  entry: {
    manager: paths.managerSrc,
    preview: paths.previewSrc,
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [paths.root_node_modules, paths.node_modules],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-nullish-coalescing-operator', '@babel/plugin-proposal-optional-chaining'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(eot|otf|woff|woff2|ttf|bmp|gif|jpe?g|png)?$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ErrorOverlayPlugin(),
    new HtmlWebPackPlugin({
      chunks: ['manager'],
      template: paths.managerHtml,
      filename: 'index.html',
      favicon: paths.favicon,
    }),
    new HtmlWebPackPlugin({
      chunks: ['preview'],
      template: paths.previewHtml,
      filename: 'iframe.html',
    }),
    new webpack.DefinePlugin({
      'process.env.templatesDirectory': JSON.stringify(templatesDirectory),
    }),
  ],
  devServer: {
    open: true,
    hotOnly: true,
  },
});
