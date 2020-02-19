import fs from 'fs';
import chalk from 'chalk';
import { sync } from 'cross-spawn';
import * as logger from '../utils/logger';
import { hasYarn, retrievePackageJson, writePackageJson } from '../utils/packageManager';
import { getTemplatesDirectory } from '../utils/paths';

export default async ({ useNpm, templatesDirectory }) => {
  logger.title('\n Adding Muil to project... \n');

  logger.info('Installing packages...');
  const useYarn = Boolean(useNpm !== true) && hasYarn();
  const installAsDevDependencies = true;
  sync(useYarn ? 'yarn' : 'npm', [useYarn ? 'add' : 'install', 'muil-2', installAsDevDependencies ? '-D' : '']);
  logger.infoSuccess();

  logger.info('Adding scripts...');
  const templatesDirectoryArg = templatesDirectory ? ` -d ${templatesDirectory}` : '';
  const packageJson = await retrievePackageJson();
  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.devDependencies = packageJson.devDependencies || {};
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.muil = `muil editor${templatesDirectoryArg}`;
  packageJson.scripts['muil-login'] = 'muil login';
  packageJson.scripts['muil-publish'] = `muil publish${templatesDirectoryArg}`;
  writePackageJson(packageJson);
  logger.infoSuccess();

  if (!fs.existsSync(getTemplatesDirectory(templatesDirectory || './templates'))) {
    fs.mkdirSync(getTemplatesDirectory(templatesDirectory || './templates'));
    logger.success('Templates directory created\n');
  }

  logger.success('Muil installed successfully 💪');
  console.log(`\n🌟 To run Muil editor, type: ${chalk.green(`${useYarn ? 'yarn' : 'npm run'} muil`)}\n`);
};
