const MUST_INCLUDE_DEPENDENCIES = ['react', 'react-dom'];

const missingDependencies = packageJson =>
  MUST_INCLUDE_DEPENDENCIES.filter(dependency => !packageJson.dependencies[dependency]);

export default missingDependencies;
