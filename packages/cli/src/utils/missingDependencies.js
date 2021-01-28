const MUST_INCLUDE_DEPENDENCIES = ['react', 'react-dom'];

const missingDependencies = (packageJson) => {
  const missing = MUST_INCLUDE_DEPENDENCIES.filter(
    (dependency) =>
      (!packageJson.dependencies && !packageJson.devDependencies) ||
      !packageJson.dependencies[dependency] ||
      !packageJson.devDependencies[dependency],
  );

  const isReactScriptsInstalled = packageJson.dependencies && packageJson.dependencies['react-scripts'];
  if (!isReactScriptsInstalled) {
    return [...missing, 'babel-loader'];
  }

  return missing;
};

export default missingDependencies;
