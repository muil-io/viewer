const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DynamicPropsPlugin = require('./muil-dynamic-props-plugin');
const { rootDir, getTemplatesDirectory, buildDirectory } = require('../utils/paths');

const ASSETS_LOADER_TYPES = {
  MUIL: 'muil',
  CLOUD: 'cloud',
  IN_LINE: 'inLine',
};

const getAssetsLoaders = ({ token, projectId, aws, gc, azur }) => {
  const loaderType =
    token && projectId
      ? ASSETS_LOADER_TYPES.MUIL
      : aws || gc || azur
      ? ASSETS_LOADER_TYPES.CLOUD
      : ASSETS_LOADER_TYPES.IN_LINE;

  switch (loaderType) {
    case ASSETS_LOADER_TYPES.MUIL:
      return [
        {
          loader: path.resolve(__dirname, 'muil-asset-loader.js'),
          options: { token, projectId },
        },
      ];
    case ASSETS_LOADER_TYPES.IN_LINE:
      return [
        {
          loader: 'url-loader',
        },
      ];
    case ASSETS_LOADER_TYPES.CLOUD:
      return [
        {
          loader: path.resolve(__dirname, 'cloud-asset-loader.js'),
          options: { aws, gc, azur },
        },
      ];
    default:
      return [];
  }
};

module.exports = ({ templatesDirectory, templatesExtension, token, projectId, aws, gc, azure, babelrc }) => {
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
          use: [
            MiniCssExtractPlugin.loader,
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
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(bmp|gif|jpe?g|png|eot|otf|woff|woff2|ttf)?$/,
          use: getAssetsLoaders({ token, projectId, aws, gc, azure }),
        },
      ],
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      'styled-components': 'styled-components',
    },
    plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin('[name].css'), new DynamicPropsPlugin()],
  };
};
