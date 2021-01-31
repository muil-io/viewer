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
  if (!isReactScriptsInstalled) {
    let found = false;
    if (packageJson.dependencies) {
      found = packageJson.dependencies['babel-loader'];
    }
    if (packageJson.devDependencies) {
      found = found || packageJson.devDependencies['babel-loader'];
    }

    if (!found) {
      missing.push('babel-loader');
    }
  }

  return missing;
};

export default missingDependencies;
