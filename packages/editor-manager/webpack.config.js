const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = {
  src: path.resolve(__dirname, 'src/index.js'),
  html: path.resolve(__dirname, 'src/index.html'),
  favicon: path.resolve(__dirname, 'src/favicon.ico'),
  dist: path.resolve(__dirname, '../editor/lib'),
};

module.exports = () => ({
  entry: [paths.src],
  mode: 'production',
  output: {
    path: paths.dist,
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
    new CleanWebpackPlugin(),
    new ErrorOverlayPlugin(),
    new HtmlWebPackPlugin({
      template: paths.html,
      favicon: paths.favicon,
    }),
  ],
});
