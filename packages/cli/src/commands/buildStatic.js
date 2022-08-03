/* eslint-disable camelcase */
const { existsSync, readFileSync, copyFileSync } = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfigStaticTemplates = require('../webpack/webpack.config.templates.js');
const webpackConfigStaticIframe = require('../webpack/webpack.config.staticIframe.js');
const logger = require('../utils/logger');
const paths = require('../utils/paths');

const TEMPLATES_OUTPUT = path.join(paths.buildStaticDirectory, 'templates');

const copyViewerManagerFiles = () => {
  copyFileSync(path.resolve(__dirname, '../../lib/index.html'), path.join(paths.buildStaticDirectory, 'index.html'));
  copyFileSync(path.resolve(__dirname, '../../lib/index.js'), path.join(paths.buildStaticDirectory, 'index.js'));
  copyFileSync(path.resolve(__dirname, '../../lib/favicon.ico'), path.join(paths.buildStaticDirectory, 'favicon.ico'));
};

module.exports = async ({ templatesDirectory }) => {
  logger.info('Compiling templates...');

  // eslint-disable-next-line
  const config = existsSync(paths.configPath) ? require(paths.configPath) : { webpack: (config) => config };
  const babelrc = existsSync(paths.babelrcPath) ? JSON.parse(readFileSync(paths.babelrcPath, 'utf-8')) : null;

  const staticTemplatesCompiler = webpackConfigStaticTemplates({
    templatesDirectory,
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
      outputPath: paths.buildStaticDirectory,
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
