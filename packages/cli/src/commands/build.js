import { existsSync, readFileSync } from 'fs';
import webpack from 'webpack';
import webpackConfig from '../webpack/webpack.config.templates.js';
import * as logger from '../utils/logger';
import { configPath, babelrcPath } from '../utils/paths';

export default async ({ templatesDirectory, templatesExtension }) => {
  logger.info('Compiling templates...');

  // eslint-disable-next-line
  const config = existsSync(configPath) ? require(configPath) : { webpack: (config) => config };
  const babelrc = existsSync(babelrcPath) ? JSON.parse(readFileSync(babelrcPath, 'utf-8')) : null;

  const defaultCompiler = webpackConfig({ templatesDirectory, templatesExtension, babelrc });
  const finalCompiler = config.webpack(defaultCompiler);

  webpack(finalCompiler, (err, stats) => {
    if (err || stats.hasErrors()) {
      logger.error(err || stats.toString('errors-only'));
      return;
    }

    logger.infoSuccess();
  });
};
