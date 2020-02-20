const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const { getTemplatesDirectory } = require('@muil-1/cli/utils/paths');

const paths = {
  src: path.resolve(__dirname, 'src'),
  html: `${path.resolve(__dirname, 'src')}/index.html`,
  node_modules: path.resolve(__dirname, 'node_modules'),
  dist: path.resolve(__dirname, '../../dist'),
};

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
        exclude: paths.node_modules,
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
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: ['url-loader'],
      },
      {
        test: /\.(eot|otf|woff|woff2|ttf)?$/,
        use: ['url-loader'],
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
      'process.env.templatesDirectory': JSON.stringify(getTemplatesDirectory(templatesDirectory)),
    }),
  ],
  devServer: {
    open: true,
    hotOnly: true,
  },
});
