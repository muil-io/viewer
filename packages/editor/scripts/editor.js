import path from 'path';
import { existsSync } from 'fs';
import express from 'express';
import open from 'open';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import previewConfig from '../webpack.config';

const rootDir = process.env.INIT_CWD || __dirname;
const distDirectory = path.resolve(__dirname, '../lib');
const configPath = path.resolve(rootDir, '.muil/config.js');
const app = express();

export default async ({ port, templatesDirectory }) => {
  // eslint-disable-next-line
  const config = existsSync(configPath) ? require(configPath) : { webpack: config => config };

  const defaultCompiler = previewConfig({ templatesDirectory: path.resolve(rootDir, templatesDirectory) });
  const finalCompiler = config.webpack(defaultCompiler);
  const compiler = webpack(finalCompiler);
  const middleware = new webpackDevMiddleware(compiler, { publicPath: '/' });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(distDirectory));

  middleware.waitUntilValid(() => {
    app.listen(port, () => console.log(`✨ Muil editor is running at http://localhost:${port}/`));
    open(`http://localhost:${port}`, {
      app: process.platform === 'win32' ? 'chrome' : process.platform === 'darwin' ? 'Google Chrome' : 'google-chrome',
    });
  });
};
