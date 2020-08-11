import path from 'path';
import { existsSync, readFileSync } from 'fs';
import chalk from 'chalk';
import express from 'express';
import open from 'open';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import previewConfig from '../webpack.config';

const rootDir = process.env.INIT_CWD || __dirname;
const distDirectory = path.resolve(__dirname, '../lib');
const configPath = path.resolve(rootDir, '.muil/config.js');
const babelrcPath = path.resolve(rootDir, '.muil/.babelrc');
const app = express();

export default async ({ port, templatesDirectory }) => {
  console.log(`${chalk.inverse('\n Starting Muil viewer... \n')}`);

  // eslint-disable-next-line
  const config = existsSync(configPath) ? require(configPath) : { webpack: (config) => config };
  const babelrc = existsSync(babelrcPath) ? JSON.parse(readFileSync(babelrcPath, 'utf-8')) : null;

  const defaultCompiler = previewConfig({ templatesDirectory: path.resolve(rootDir, templatesDirectory), babelrc });
  const finalCompiler = config.webpack(defaultCompiler);
  const compiler = webpack(finalCompiler);
  const middleware = new webpackDevMiddleware(compiler, { publicPath: '/', logLevel: 'error' });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(distDirectory));

  middleware.waitUntilValid(() => {
    app.listen(port, () => console.log(`✨ Muil templates viewer is running at http://localhost:${port}/`));
    open(`http://localhost:${port}`);
  });
};
