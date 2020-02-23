const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const paths = {
  src: path.resolve(__dirname, 'src/index.js'),
  html: path.resolve(__dirname, 'src/index.html'),
  node_modules: path.resolve(__dirname, 'node_modules'),
  root_node_modules: path.resolve(__dirname, '../../node_modules'),
  dist: path.resolve(__dirname, 'lib'),
};

const includedPaths = templatesDirectory => [
  path.resolve(__dirname, 'src'),
  path.resolve(process.env.INIT_CWD || __dirname, templatesDirectory),
];

module.exports = ({ templatesDirectory }) => ({
  entry: [paths.src, 'webpack-hot-middleware/client'],
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'iframe.js',
    path: paths.dist,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: includedPaths(templatesDirectory),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-nullish-coalescing-operator', '@babel/plugin-proposal-optional-chaining'],
          },
        },
      },
      {
        test: /\.(eot|otf|woff|woff2|ttf|bmp|gif|jpe?g|png)?$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ErrorOverlayPlugin(),
    new HtmlWebPackPlugin({
      template: paths.html,
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
