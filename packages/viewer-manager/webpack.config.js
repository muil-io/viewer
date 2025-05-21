const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = {
  managerSrc: path.resolve(__dirname, 'src/index.js'),
  previewSrc: path.resolve(__dirname, '../viewer/src/index.js'),
  managerHtml: path.resolve(__dirname, 'src/index.html'),
  previewHtml: path.resolve(__dirname, '../viewer/src/index.html'),
  favicon: path.resolve(__dirname, 'src/favicon.ico'),
  node_modules: path.resolve(__dirname, 'node_modules'),
  root_node_modules: path.resolve(__dirname, '../../node_modules'),
  dist: path.resolve(__dirname, '../viewer/lib'),
  distStatic: path.resolve(__dirname, '../cli/lib'),
};

const common = () => ({
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: [paths.root_node_modules, paths.node_modules],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              ['@babel/plugin-transform-runtime', { regenerator: true }],
              ['react-css-modules', { generateScopedName: '[local]___[hash:base64:5]' }],
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-nullish-coalescing-operator',
              '@babel/plugin-proposal-optional-chaining',
            ],
          },
        },
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
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: { svgo: false, ref: true },
          },
        ],
      },
      {
        test: /\.(eot|otf|woff|woff2|ttf|bmp|gif|jpe?g|png)?$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      chunks: ['manager'],
      template: paths.managerHtml,
      filename: 'index.html',
      favicon: paths.favicon,
    }),
  ],
});

const production = (dist = paths.dist) => ({
  entry: {
    manager: paths.managerSrc,
  },
  mode: 'production',
  output: {
    path: dist,
    filename: 'index.js',
  },
});

const development = ({ templatesDirectory }) => ({
  entry: {
    manager: paths.managerSrc,
    preview: paths.previewSrc,
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    path: paths.dist,
  },
  plugins: [
    new HtmlWebPackPlugin({
      chunks: ['preview'],
      template: paths.previewHtml,
      filename: 'iframe.html',
    }),
    new webpack.DefinePlugin({
      'process.env.templatesDirectory': JSON.stringify(templatesDirectory),
    }),
  ],
  devServer: {
    open: true,
    hot: 'only',
    port: 8000,
  },
});

module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return [merge(common(), production()), merge(common(), production(paths.distStatic))];
    default:
      return merge(common(), development({ templatesDirectory: '../../../templates-starter-kit' }));
  }
};
