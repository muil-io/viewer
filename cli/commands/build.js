import webpack from 'webpack';
import { getToken } from '../utils/credentials';
import webpackConfig from '../webpack/webpack.config.templates.js';
import * as logger from '../utils/logger';

export default async ({ templatesDirectory, templatesExtension }) => {
  const token = await getToken();
  if (!token) return;

  logger.info('Compiling templates...');

  webpack(webpackConfig({ templatesDirectory, templatesExtension, token }), (err, stats) => {
    if (err || stats.hasErrors()) {
      return;
    }

    logger.success('Templates compiled successfully\n');
  });
};
