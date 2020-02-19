import express from 'express';
import path from 'path';
import opn from 'opn';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import * as logger from '../utils/logger';
import iframeConfig from '../../webpack.config.js';

const app = express();
const dist = path.resolve(__dirname, '../../', 'dist');

export default async ({ port, templatesDirectory }) => {
  logger.title('\n Starting Muil editor... \n');

  app.get('/', (req, res) => res.sendFile(`${dist}/index.html`));
  app.get('/main.js', (req, res) => res.sendFile(`${dist}/main.js`));

  app.listen(port, () => logger.info(`Muil editor is running at http://localhost:${port}/`));
  opn(`http://localhost:${port}`);

  const compiler = webpack(iframeConfig({ templatesDirectory }));
  const server = new WebpackDevServer(compiler);

  server.listen(3002, 'localhost', () => logger.info(`Muil editor is running at http://localhost:${3002}/`));
};
