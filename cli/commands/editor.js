import express from 'express';
import path from 'path';
import opn from 'opn';
import webpack from 'webpack';
import * as logger from '../utils/logger';
import server from '../utils/server';
import iframeConfig from '../../webpack.config.js';

const app = express();
const dist = path.resolve(__dirname, '../../', 'dist');

export default async ({ port, templatesDirectory }) => {
  logger.title('\n Starting Muil editor... \n');

  const compiler = webpack(iframeConfig({ templatesDirectory }));
  await server({ compiler, options: { quiet: true }, port: 8081 });

  app.get('/', (req, res) => res.sendFile(`${dist}/index.html`));
  app.get('/main.js', (req, res) => res.sendFile(`${dist}/main.js`));
  app.listen(port, () => logger.info(`Muil editor is running at http://localhost:${port}/`));
  opn(`http://localhost:${port}`);
};
