import { homedir } from 'os';
import fs from 'fs';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.templates.js';
import { login, upload } from '../services/firebase';
import * as logger from '../utils/logger';

export default async ({ templatesDirectory = './templates', template }) => {
  const credentialsFile = `${homedir()}/.muil/credentials`;
  if (!fs.existsSync(credentialsFile)) {
    logger.error(`You are not logged in\nPlease login first with command 'yarn muil-login'`);
    return;
  }

  logger.info('Compiling templates...');
  const compiler = webpack(webpackConfig({ templatesDirectory, template }));
  await compiler.run(async () => {
    logger.success('Templates compiled successfully\n');

    const { email, password } = JSON.parse(fs.readFileSync(credentialsFile, 'utf8'));
    const token = await login({ email, password });

    logger.info('Uploading templates...');
    await upload({ token });
    logger.success('Templates uploaded successfully\n');
  });
};

// TODO: publish all templates or specific template
