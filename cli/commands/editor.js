import express from 'express';
import path from 'path';
import opn from 'opn';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import * as logger from '../utils/logger';
import iframeConfig from '../../webpack.config.js';

const app = express();
const dist = path.resolve(__dirname, '../../', 'dist');

export default async ({ port, templatesDirectory }) => {
  logger.title('\n Starting Muil editor... \n');

  const compiler = webpack(iframeConfig({ templatesDirectory }));
  const middleware = new webpackDevMiddleware(compiler, {
    publicPath: '/',
    writeToDisk: true,
  });

  app.use(express.static(dist));
  app.use(middleware);

  middleware.waitUntilValid(() => {
    app.listen(port, () => logger.info(`Muil editor is running at http://localhost:${port}/`));
    opn(`http://localhost:${port}`);
  });
};
