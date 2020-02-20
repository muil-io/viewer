import fs from 'fs';
import { spawn, sync as spawnSync } from 'cross-spawn';
import path from 'path';
import findUp from 'find-up';

export const hasYarn = () => {
  const yarnAvailable = spawnSync('yarn', ['--version'], { silent: true });
  const npmAvailable = spawnSync('npm', ['--version'], { silent: true });

  const lockFile = findUp.sync(['yarn.lock', 'package-lock.json']);
  const hasYarnLock = lockFile && path.basename(lockFile) === 'yarn.lock';

  if (yarnAvailable.status === 0 && (hasYarnLock || npmAvailable.status !== 0)) {
    return true;
  }
  return false;
};

export function getPackageJson() {
  const packageJsonPath = path.resolve('package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }

  const jsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  return JSON.parse(jsonContent);
}

export default function npmInit() {
  const results = spawn.sync(hasYarn() ? 'yarn' : 'npm', ['init', '-y'], {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8',
    silent: true,
  });
  return results.stdout;
}

export async function retrievePackageJson() {
  const existing = getPackageJson();
  if (existing) {
    return existing;
  }

  // npmInit will create a new package.json file
  npmInit();

  return getPackageJson() || {};
}

export function writePackageJson(packageJson) {
  const content = `${JSON.stringify(packageJson, null, 2)}\n`;
  const packageJsonPath = path.resolve('package.json');

  fs.writeFileSync(packageJsonPath, content, 'utf8');
}
