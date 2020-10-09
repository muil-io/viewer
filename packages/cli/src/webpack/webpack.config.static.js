const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { rootDir, getTemplatesDirectory, buildStaticDirectory } = require('../utils/paths');

module.exports = ({ templatesDirectory, templatesExtension, babelrc }) => {
  const templatesDir = getTemplatesDirectory(templatesDirectory);
  return {
    mode: 'production',
    entry: glob.sync(`${templatesDir}/**/*.${templatesExtension}`).reduce(
      (obj, el) => ({
        ...obj,
        [path.parse(el).base.slice(0, -(templatesExtension.length + 1))]: el,
      }),
      {},
    ),
    output: {
      path: buildStaticDirectory,
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },
    target: 'node',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: babelrc || {
              babelrc: false,
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                ['react-css-modules', { generateScopedName: '[local]___[hash:base64:5]' }],
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-proposal-optional-chaining',
              ],
            },
          },
          exclude: path.resolve(rootDir, 'node_modules'),
        },
        {
          test: /\.module\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(bmp|gif|jpe?g|png|eot|otf|woff|woff2|ttf)?$/,
          use: 'url-loader',
        },
      ],
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      'styled-components': 'styled-components',
    },
    plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin('[name].css')],
  };
};
