const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { rootDir, getTemplatesDirectory, buildDirectory } = require('../utils/paths');

module.exports = ({ templatesDirectory, templatesExtension, token, babelrc }) => {
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
      path: buildDirectory,
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
            options: babelrc || { presets: ['@babel/preset-env', '@babel/preset-react'] },
          },
          exclude: path.resolve(rootDir, 'node_modules'),
        },
        {
          test: /\.css/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(eot|otf|woff|woff2|ttf)?$/,
          use: [
            {
              loader: path.resolve(__dirname, 'muil-asset-loader.js'),
              options: { token },
            },
          ],
        },
        {
          test: /\.(bmp|gif|jpe?g|png)?$/,
          use: [
            {
              loader: path.resolve(__dirname, 'muil-asset-loader.js'),
              options: { token },
            },
          ],
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
