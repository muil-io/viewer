import { existsSync, readFileSync } from 'fs';
import webpack from 'webpack';
import prompts from 'prompts';
import webpackConfig from '../webpack/webpack.config.templates.js';
import { publish } from '../services/api';
import { getToken } from '../utils/credentials';
import * as logger from '../utils/logger';
import { configPath, babelrcPath } from '../utils/paths';
import { selectProject } from '../utils/projectManager';

export default async ({ templatesDirectory, templatesExtension, branch }) => {
  const token = await getToken();
  if (!token) return;

  const projectId = await selectProject({ token });
  if (!projectId) return;

  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `Are you sure you want to publish current changes${branch ? ` to branch '${branch}'` : ''}?`,
    initial: false,
  });
  if (!confirm) return;

  logger.info('Compiling templates...');

  // eslint-disable-next-line
  const config = existsSync(configPath) ? require(configPath) : { webpack: (config) => config };
  const babelrc = existsSync(babelrcPath) ? JSON.parse(readFileSync(babelrcPath, 'utf-8')) : null;

  const defaultCompiler = webpackConfig({ templatesDirectory, templatesExtension, token, projectId, babelrc });
  const finalCompiler = config.webpack(defaultCompiler);

  webpack(finalCompiler, async (err, stats) => {
    if (err || stats.hasErrors()) {
      logger.error(err || stats.toString('errors-only'));
      return;
    }
    logger.infoSuccess();

    logger.info('Uploading templates...');
    await publish({ token, projectId, branch });
    logger.infoSuccess('Templates uploaded successfully\n');
  });
};
