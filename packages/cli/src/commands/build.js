/* eslint-disable camelcase */
const { existsSync, readFileSync } = require('fs');
const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.config.templates.js');
const logger = require('../utils/logger');
const { configPath, babelrcPath } = require('../utils/paths');

module.exports = async ({
  templateId,
  templatesDirectory,
  aws_access_key_id,
  aws_secrete_access_key,
  aws_bucket_name,
  gcs_key_file_path,
  gsc_bucket_name,
  azure_account_name,
  azure_account_key,
  azure_share_name,
  azure_dir_name,
  suppressLogs = false,
}) =>
  new Promise((res, rej) => {
    if (!suppressLogs) {
      logger.info('Compiling templates...');
    }

    // eslint-disable-next-line
    const config = existsSync(configPath) ? require(configPath) : { webpack: (config) => config };
    const babelrc = existsSync(babelrcPath) ? JSON.parse(readFileSync(babelrcPath, 'utf-8')) : null;

    const defaultCompiler = webpackConfig({
      templateId,
      templatesDirectory,
      aws: aws_bucket_name
        ? {
            aws_access_key_id,
            aws_secrete_access_key,
            aws_bucket_name,
          }
        : undefined,
      gcs: gcs_key_file_path
        ? {
            gcs_key_file_path,
            gsc_bucket_name,
          }
        : undefined,
      azure: azure_account_name
        ? { azure_account_name, azure_account_key, azure_share_name, azure_dir_name }
        : undefined,
      babelrc,
    });
    const finalCompiler = config.webpack(defaultCompiler);

    webpack(finalCompiler, (err, stats) => {
      if (err || stats.hasErrors()) {
        logger.error(err || stats.toString('errors-only'));
        return rej(err || stats.toString('errors-only'));
      }

      if (!suppressLogs) {
        logger.infoSuccess();
      }
      return res();
    });
  });
