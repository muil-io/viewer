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

const getAssetsLoaders = ({ token, aws, gcs, azure }) => {
  const loaderType = token
    ? ASSETS_LOADER_TYPES.MUIL
    : aws || gcs || azure
    ? ASSETS_LOADER_TYPES.CLOUD
    : ASSETS_LOADER_TYPES.IN_LINE;

  switch (loaderType) {
    case ASSETS_LOADER_TYPES.MUIL:
      return [
        {
          loader: path.resolve(__dirname, 'muil-asset-loader.js'),
          options: { token },
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
          options: { aws, gcs, azure },
        },
      ];
    default:
      return [];
  }
};

module.exports = ({
  templateId,
  templatesDirectory,
  token,
  aws,
  gcs,
  azure,
  babelrc,
  inlineCss = false,
  outputPath = buildDirectory,
}) => {
  const templatesDir = getTemplatesDirectory(templatesDirectory);
  return {
    mode: 'production',
    resolve: {
      fallback: { os: false, stream: false },
    },
    entry: () =>
      glob.sync(`${templatesDir}/**/${templateId || '*'}.template.{ts,tsx,js,jsx}`).reduce(
        (obj, el) => ({
          ...obj,
          [path
            .parse(el)
            .base.replace(/\.template\.(j|t)sx?$/, '')
            .toLowerCase()]: el,
        }),
        {},
      ),
    output: {
      path: outputPath,
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },
    target: 'node',
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          use: {
            loader: 'babel-loader',
            options: babelrc || {
              babelrc: false,
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
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
            inlineCss ? 'style-loader' : MiniCssExtractPlugin.loader,
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
          use: [inlineCss ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(gif|jpe?g|png)?$/,
          use: getAssetsLoaders({ token, aws, gcs, azure }),
        },
        {
          test: /\.(bmp|eot|otf|woff|woff2|ttf)?$/,
          loader: 'url-loader',
        },
      ],
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      'styled-components': 'styled-components',
    },
    plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: '[name].css' }), new DynamicPropsPlugin()],
  };
};
