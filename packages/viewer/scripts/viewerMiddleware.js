const path = require('path');
const { existsSync, readFileSync } = require('fs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const previewConfig = require('../webpack.config');

const rootDir = process.env.INIT_CWD || __dirname;
const distDirectory = path.resolve(__dirname, '../lib');
const configPath = path.resolve(rootDir, '.muil/config.js');
const babelrcPath = path.resolve(rootDir, '.muil/.babelrc');

const viewerMiddleware = ({ templatesDirectory }) => {
  // eslint-disable-next-line
  const config = existsSync(configPath) ? require(configPath) : { webpack: (config) => config };
  const babelrc = existsSync(babelrcPath) ? JSON.parse(readFileSync(babelrcPath, 'utf-8')) : null;

  const defaultCompiler = previewConfig({ templatesDirectory: path.resolve(rootDir, templatesDirectory), babelrc });
  const finalCompiler = config.webpack(defaultCompiler);
  const compiler = webpack(finalCompiler);
  const middleware = new webpackDevMiddleware(compiler, { publicPath: '/' });

  return { compiler, middleware, viewerDirectory: distDirectory };
};

module.exports = viewerMiddleware;
