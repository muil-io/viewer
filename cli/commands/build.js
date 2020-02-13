import webpack from 'webpack';
import webpackConfig from '../config/webpack.config.templates.js';
import * as logger from '../utils/logger';

export default async ({ templatesDirectory, templatesExtension }) => {
  logger.info('Compiling templates...');
  const compiler = webpack(webpackConfig({ templatesDirectory, templatesExtension }));
  await compiler.run(async () => {
    logger.success('Templates compiled successfully\n');
  });
};
