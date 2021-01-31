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
  console.log('isReactScriptsInstalled', isReactScriptsInstalled);
  if (!isReactScriptsInstalled) {
    let found = false;
    console.log('packageJson.dependencies', packageJson.dependencies);
    if (packageJson.dependencies) {
      found = packageJson.dependencies['babel-loader'];
    }
    console.log('packageJson.devDependencies', packageJson.devDependencies);
    if (packageJson.devDependencies) {
      found = found || packageJson.devDependencies['babel-loader'];
    }

    console.log('found', found);
    if (!found) {
      missing.push('babel-loader');
    }
  }

  console.log('missing', missing);
  return missing;
};

export default missingDependencies;
