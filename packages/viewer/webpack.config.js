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

module.exports = ({ templatesDirectory, babelrc }) => {
  const babelLoader = {
    loader: 'babel-loader',
    options: babelrc || {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        ['react-css-modules', { generateScopedName: '[local]___[hash:base64:5]' }],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
      ],
    },
  };

  return {
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
          exclude: /node_modules/,
          use: babelLoader,
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            babelLoader,
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          use: babelLoader,
        },
        {
          test: /\.module\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[local]___[hash:base64:5]',
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(eot|otf|woff|woff2|ttf)?$/,
          use: ['file-loader'],
        },
        {
          test: /\.(bmp|gif|jpe?g|png)?$/,
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
  };
};
