import webpack from 'webpack';
import prompts from 'prompts';
import webpackConfig from '../config/webpack.config.templates.js';
import { publish } from '../services/api';
import { getToken } from '../utils/credentials';
import * as logger from '../utils/logger';

export default async ({ templatesDirectory, templatesExtension, branch }) => {
  const token = await getToken();
  if (!token) return;

  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `Are you sure you want to publish current changes${branch ? ` to branch '${branch}'` : ''}?`,
    initial: false,
  });
  if (!confirm) return;

  logger.info('Compiling templates...');
  const compiler = webpack(webpackConfig({ templatesDirectory, templatesExtension }));
  await compiler.run(async () => {
    logger.success('Templates compiled successfully\n');
    logger.info('Uploading templates...');
    await publish({ token, branch });
    logger.success('Templates uploaded successfully\n');
  });
};
