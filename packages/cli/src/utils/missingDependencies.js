import * as logger from './logger';

const MUST_INCLUDE_DEPENDENCIES = ['react', 'react-dom'];

const missingDependencies = (packageJson) => {
  const missing = MUST_INCLUDE_DEPENDENCIES.filter((dependency) => {
    let found = false;
    if (packageJson.dependencies) {
      found = packageJson.dependencies[dependency];
    }
    if (packageJson.devDependencies) {
      found = found || packageJson.devDependencies[dependency];
    }

    return !found;
  });

  const isReactScriptsInstalled = packageJson.dependencies && packageJson.dependencies['react-scripts'];
  logger.info('isReactScriptsInstalled', isReactScriptsInstalled);
  if (!isReactScriptsInstalled) {
    let found = false;
    logger.info('packageJson.dependencies', packageJson.dependencies);
    if (packageJson.dependencies) {
      found = packageJson.dependencies['babel-loader'];
    }
    logger.info('packageJson.devDependencies', packageJson.devDependencies);
    if (packageJson.devDependencies) {
      found = found || packageJson.devDependencies['babel-loader'];
    }

    logger.info('found', found);
    if (!found) {
      missing.push('babel-loader');
    }
  }

  logger.info('missing', missing);
  return missing;
};

export default missingDependencies;
