import { homedir } from 'os';
import chalk from 'chalk';
import fs from 'fs';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.templates.js';
import { login, upload } from '../services/firebase';

const rootDir = process.env.INIT_CWD || '.';

export default async () => {
  const credentialsFile = `${homedir()}/.muil/credentials`;
  if (!fs.existsSync(credentialsFile)) {
    console.log(chalk.red(`You are not logged in\nPlease login first with command 'yarn muil-login'`));
    return;
  }

  console.log('Compiling templates...');
  const compiler = webpack(webpackConfig({ rootDir }));
  await compiler.run(async () => {
    console.log(chalk.green('Templates compiled successfully\n'));

    const { email, password } = JSON.parse(fs.readFileSync(credentialsFile, 'utf8'));
    const token = await login({ email, password });

    console.log('Uploading templates...');
    await upload({ rootDir, token });
    console.log(chalk.green('Templates uploaded successfully\n'));
  });
};

// TODO: publish all templates or specific template
