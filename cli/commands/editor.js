import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import * as logger from '../utils/logger';
import storyConfig from '../../webpack.config.js';

export default async ({ port = 8000 }) => {
  logger.title('\n Starting Muil editor... \n');

  const compiler = webpack(storyConfig());
  const server = new WebpackDevServer(compiler, {
    quiet: true,
    overlay: true,
    open: 'chrome',
  });

  server.listen(port, 'localhost', () => logger.info(`Muil editor is running at http://localhost:${port}/`));
};
