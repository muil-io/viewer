import { existsSync, readFileSync } from 'fs';
import webpack from 'webpack';
import { getToken } from '../utils/credentials';
import webpackConfig from '../webpack/webpack.config.templates.js';
import * as logger from '../utils/logger';
import { configPath, babelrcPath } from '../utils/paths';

export default async ({ templatesDirectory, templatesExtension }) => {
  const token = await getToken();
  if (!token) return;

  logger.info('Compiling templates...');

  // eslint-disable-next-line
  const config = existsSync(configPath) ? require(configPath) : { webpack: config => config };
  const babelrc = existsSync(babelrcPath) ? JSON.parse(readFileSync(babelrcPath, 'utf-8')) : {};

  const defaultCompiler = webpackConfig({ templatesDirectory, templatesExtension, token, babelrc });
  const finalCompiler = config.webpack(defaultCompiler);

  webpack(finalCompiler, (err, stats) => {
    if (err || stats.hasErrors()) {
      return;
    }

    logger.infoSuccess();
  });
};
