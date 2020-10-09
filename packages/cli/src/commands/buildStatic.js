/* eslint-disable camelcase */
import { existsSync, readFileSync, copyFileSync } from 'fs';
import path from 'path';
import webpack from 'webpack';
import webpackConfigStaticTemplates from '../webpack/webpack.config.staticTemplates.js';
import webpackConfigStaticIframe from '../webpack/webpack.config.staticIframe.js';
import * as logger from '../utils/logger';
import { configPath, babelrcPath, buildStaticDirectory } from '../utils/paths';

export default async ({ templatesDirectory, templatesExtension }) => {
  logger.info('Compiling templates...');

  // eslint-disable-next-line
  const config = existsSync(configPath) ? require(configPath) : { webpack: (config) => config };
  const babelrc = existsSync(babelrcPath) ? JSON.parse(readFileSync(babelrcPath, 'utf-8')) : null;

  const defaultCompiler = webpackConfigStaticTemplates({
    templatesDirectory,
    templatesExtension,
    babelrc,
  });
  const finalCompiler = config.webpack(defaultCompiler);

  webpack(finalCompiler, (err, stats) => {
    if (err || stats.hasErrors()) {
      logger.error(err || stats.toString('errors-only'));
      return;
    }

    logger.infoSuccess();

    logger.info('Compiling iframe...');
    const iframeCompiler = webpackConfigStaticIframe({
      templatesDirectory: path.join(buildStaticDirectory, 'templates'),
    });

    webpack(iframeCompiler, (errIframe, statsIframe) => {
      if (errIframe || statsIframe.hasErrors()) {
        logger.error(errIframe || statsIframe.toString('errors-only'));
        return;
      }

      logger.infoSuccess();

      copyFileSync(path.resolve(__dirname, '../../lib/index.html'), path.join(buildStaticDirectory, 'index.html'));
      copyFileSync(path.resolve(__dirname, '../../lib/index.js'), path.join(buildStaticDirectory, 'index.js'));
      copyFileSync(path.resolve(__dirname, '../../lib/favicon.ico'), path.join(buildStaticDirectory, 'favicon.ico'));
    });
  });
};
