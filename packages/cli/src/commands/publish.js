const { existsSync, readFileSync } = require('fs');
const webpack = require('webpack');
const prompts = require('prompts');
const webpackConfig = require('../webpack/webpack.config.templates.js');
const { cloudSettings, publish } = require('../services/api');
const { getToken, getHost } = require('../utils/credentials');
const logger = require('../utils/logger');
const paths = require('../utils/paths');

module.exports = async ({ templatesDirectory, branch, force = false }) => {
  const token = await getToken();
  if (!token) return;

  if (!force) {
    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: `Are you sure you want to publish current changes${branch ? ` to branch '${branch}'` : ''}?`,
      initial: false,
    });
    if (!confirm) return;
  }

  let newToken = token;
  const host = await getHost();
  if (host) {
    // on-premise solution
    const { data: settings } = await cloudSettings({ token });
    if (!settings.projectId) {
      newToken = null; // on-premise without cloud settings - use inline loader
    }
  }

  logger.info('Compiling templates...');

  // eslint-disable-next-line
  const config = existsSync(paths.configPath) ? require(paths.configPath) : { webpack: (config) => config };
  const babelrc = existsSync(paths.babelrcPath) ? JSON.parse(readFileSync(paths.babelrcPath, 'utf-8')) : null;

  const defaultCompiler = webpackConfig({ templatesDirectory, token: newToken, babelrc });
  const finalCompiler = config.webpack(defaultCompiler);

  webpack(finalCompiler, async (err, stats) => {
    if (err || stats.hasErrors()) {
      logger.error(err || stats.toString('errors-only'));
      return;
    }
    logger.infoSuccess();

    logger.info('Uploading templates...');
    await publish({ token, branch });
    logger.infoSuccess('Templates uploaded successfully\n');
  });
};
