/* eslint-disable camelcase */
import { existsSync, readFileSync } from 'fs';
import webpack from 'webpack';
import webpackConfig from '../webpack/webpack.config.templates.js';
import * as logger from '../utils/logger';
import { configPath, babelrcPath } from '../utils/paths';

export default async ({
  templatesDirectory,
  templatesExtension,
  aws_access_key_id,
  aws_secrete_access_key,
  aws_bucket_name,
  gc,
  azure,
}) => {
  logger.info('Compiling templates...');

  // eslint-disable-next-line
  const config = existsSync(configPath) ? require(configPath) : { webpack: (config) => config };
  const babelrc = existsSync(babelrcPath) ? JSON.parse(readFileSync(babelrcPath, 'utf-8')) : null;

  const defaultCompiler = webpackConfig({
    templatesDirectory,
    templatesExtension,
    aws: aws_access_key_id
      ? {
          aws_access_key_id,
          aws_secrete_access_key,
          aws_bucket_name,
        }
      : undefined,
    gc,
    azure,
    babelrc,
  });
  const finalCompiler = config.webpack(defaultCompiler);

  webpack(finalCompiler, (err, stats) => {
    if (err || stats.hasErrors()) {
      logger.error(err || stats.toString('errors-only'));
      return;
    }

    logger.infoSuccess();
  });
};
