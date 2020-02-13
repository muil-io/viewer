const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { rootDir, getTemplatesDirectory, buildDirectory } = require('../utils/paths');

module.exports = ({ templatesDirectory, templatesExtension }) => {
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
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-proposal-optional-chaining',
              ],
            },
          },
          exclude: path.resolve(rootDir, 'node_modules'),
        },
        {
          test: /\.css/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          include: [path.resolve(rootDir)],
          use: ['url-loader'],
        },
        {
          test: /\.(eot|otf|woff|woff2|ttf)?$/,
          include: [path.resolve(rootDir)],
          use: ['url-loader'],
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
