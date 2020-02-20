import express from 'express';
import opn from 'opn';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import iframeConfig from '../webpack/webpack.config.iframe.js';
import * as logger from '../utils/logger';
import { distDirectory } from '../utils/paths';

const app = express();

export default async ({ port, templatesDirectory }) => {
  logger.title('\n Starting Muil editor... \n');

  const compiler = webpack(iframeConfig({ templatesDirectory }));
  const middleware = new webpackDevMiddleware(compiler, {
    publicPath: '/',
    writeToDisk: true,
    noInfo: true,
    aggregateTimeout: 1,
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(distDirectory));

  middleware.waitUntilValid(() => {
    app.listen(port, () => console.log(`✨ Muil editor is running at http://localhost:${port}/`));
    opn(`http://localhost:${port}`);
  });
};
