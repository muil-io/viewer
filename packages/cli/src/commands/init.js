import fs from 'fs';
import fse from 'fs-extra';
import chalk from 'chalk';
import { sync } from 'cross-spawn';
import * as logger from '../utils/logger';
import { hasYarn, retrievePackageJson, writePackageJson } from '../utils/packageManager';
import missingDependencies from '../utils/missingDependencies';

export default async ({ useNpm, templatesDirectory }) => {
  logger.title('\n Adding Muil to project... \n');

  logger.info('Installing packages...');
  const useYarn = Boolean(useNpm !== true) && hasYarn();
  const installAsDevDependencies = true;
  sync(useYarn ? 'yarn' : 'npm', [useYarn ? 'add' : 'install', '@muil/editor', installAsDevDependencies ? '-D' : '']);

  const packageJson = await retrievePackageJson();
  const installDependencies = missingDependencies(packageJson);

  if (installDependencies.length > 0) {
    sync(useYarn ? 'yarn' : 'npm', [useYarn ? 'add' : 'install', installDependencies.join(' ')]);
  }

  logger.infoSuccess();

  logger.info('Adding scripts...');
  const templatesDirectoryArg = templatesDirectory ? ` -d ${templatesDirectory}` : '';
  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.devDependencies = packageJson.devDependencies || {};
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.muil = `muil-editor${templatesDirectoryArg}`;
  packageJson.scripts['muil-cli'] = 'muil-cli';
  writePackageJson(packageJson);
  logger.infoSuccess();

  fs.appendFileSync('.gitignore', '\n# muil build folder\n./muil/build\n');

  if (
    !fs.existsSync(templatesDirectory || './templates') &&
    fs.existsSync('./node_modules/@muil/templates-starter-kit')
  ) {
    fse.copySync('./node_modules/@muil/templates-starter-kit', templatesDirectory || './templates');
    fse.unlinkSync(`${templatesDirectory || './templates'}/package.json`);
    logger.success('Templates directory created\n');
  }

  logger.success('Muil installed successfully 💪');
  console.log(`\n🌟 To run Muil editor, type: ${chalk.green(`${useYarn ? 'yarn' : 'npm run'} muil`)}\n`);
};
