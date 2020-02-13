import { homedir } from 'os';
import fs from 'fs';
import webpack from 'webpack';
import prompts from 'prompts';
import webpackConfig from '../config/webpack.config.templates.js';
import { login, upload } from '../services/api';
import * as logger from '../utils/logger';

export default async ({ templatesDirectory, templatesExtension, branch }) => {
  const credentialsFile = `${homedir()}/.muil/credentials`;
  if (!fs.existsSync(credentialsFile)) {
    logger.error(`You are not logged in\nPlease login first with command 'yarn muil-login'`);
    return;
  }
  const { email, password } = JSON.parse(fs.readFileSync(credentialsFile, 'utf8'));
  const token = await login({ email, password });

  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `Are you sure you want to publish current changes${branch ? ` to branch '${branch}'` : ''}?`,
    initial: true,
  });
  if (!confirm) return;

  logger.info('Compiling templates...');
  const compiler = webpack(webpackConfig({ templatesDirectory, templatesExtension }));
  await compiler.run(async () => {
    logger.success('Templates compiled successfully\n');
    logger.info('Uploading templates...');
    await upload({ token, branch });
    logger.success('Templates uploaded successfully\n');
  });
};
