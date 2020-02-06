import chalk from 'chalk';
import { sync } from 'cross-spawn';
import { hasYarn, retrievePackageJson, writePackageJson } from '../utils/packageManager';

export default async (options = {}) => {
  console.log(chalk.inverse('\n Adding Muil to project... \n'));

  console.log(chalk.cyan('Installing package...'));
  const useYarn = Boolean(options.useNpm !== true) && hasYarn();
  const installAsDevDependencies = true;
  sync(useYarn ? 'yarn' : 'npm', [useYarn ? 'add' : 'install', 'muil-2', installAsDevDependencies ? '-D' : '']);

  console.log(chalk.cyan('Adding scripts...\n'));
  const packageJson = await retrievePackageJson();
  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.devDependencies = packageJson.devDependencies || {};
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.muil = 'muil editor';
  packageJson.scripts['muil-login'] = 'muil login';
  packageJson.scripts['muil-publish'] = 'muil publish';
  writePackageJson(packageJson);

  console.log('Muil installed successfully 💪');
  console.log(`To run Muil, type: ${chalk.green(`${useYarn ? 'yarn' : 'npm run'} muil`)}\n`);
};
