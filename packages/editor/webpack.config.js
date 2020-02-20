const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const paths = {
  src: path.resolve(__dirname, 'src'),
  html: `${path.resolve(__dirname, 'src')}/index.html`,
  favicon: `${path.resolve(__dirname, 'src')}/favicon.ico`,
  node_modules: path.resolve(__dirname, 'node_modules'),
};

module.exports = () => ({
  entry: [paths.src],
  mode: 'production',
  devtool: 'cheap-module-source-map',
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
    new ErrorOverlayPlugin(),
    new HtmlWebPackPlugin({
      template: paths.html,
      favicon: paths.favicon,
    }),
  ],
  devServer: {
    open: true,
    hotOnly: true,
  },
});
