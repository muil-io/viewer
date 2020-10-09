/* eslint-disable camelcase */
import { existsSync, readFileSync, copyFileSync } from 'fs';
import path from 'path';
import webpack from 'webpack';
import webpackConfigStaticTemplates from '../webpack/webpack.config.templates.js';
import webpackConfigStaticIframe from '../webpack/webpack.config.staticIframe.js';
import * as logger from '../utils/logger';
import { configPath, babelrcPath, buildStaticDirectory } from '../utils/paths';

const TEMPLATES_OUTPUT = path.join(buildStaticDirectory, 'templates');

const copyViewerManagerFiles = () => {
  copyFileSync(path.resolve(__dirname, '../../lib/index.html'), path.join(buildStaticDirectory, 'index.html'));
  copyFileSync(path.resolve(__dirname, '../../lib/index.js'), path.join(buildStaticDirectory, 'index.js'));
  copyFileSync(path.resolve(__dirname, '../../lib/favicon.ico'), path.join(buildStaticDirectory, 'favicon.ico'));
};

export default async ({ templatesDirectory, templatesExtension }) => {
  logger.info('Compiling templates...');

  // eslint-disable-next-line
  const config = existsSync(configPath) ? require(configPath) : { webpack: (config) => config };
  const babelrc = existsSync(babelrcPath) ? JSON.parse(readFileSync(babelrcPath, 'utf-8')) : null;

  const staticTemplatesCompiler = webpackConfigStaticTemplates({
    templatesDirectory,
    templatesExtension,
    babelrc,
    inlineCss: true,
    outputPath: TEMPLATES_OUTPUT,
  });
  const finalStaticTemplatesCompiler = config.webpack(staticTemplatesCompiler);

  webpack(finalStaticTemplatesCompiler, (err, stats) => {
    if (err || stats.hasErrors()) {
      logger.error(err || stats.toString('errors-only'));
      return;
    }

    logger.infoSuccess();

    logger.info('Compiling Muil viewer...');
    const iframeCompiler = webpackConfigStaticIframe({
      templatesDirectory: TEMPLATES_OUTPUT,
      outputPath: buildStaticDirectory,
    });

    webpack(iframeCompiler, (errIframe, statsIframe) => {
      if (errIframe || statsIframe.hasErrors()) {
        logger.error(errIframe || statsIframe.toString('errors-only'));
        return;
      }

      logger.infoSuccess();

      copyViewerManagerFiles();
    });
  });
};
