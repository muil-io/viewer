const path = require('path');
const { homedir } = require('os');

const rootDir = process.env.INIT_CWD || __dirname;
const configurationDirectory = `${homedir()}/.muil`;
const configFile = path.resolve(rootDir, '.muilrc');
const buildDirectory = path.resolve(rootDir, '.muil/build');
const configPath = path.resolve(rootDir, '.muil/config.js');
const babelrcPath = path.resolve(rootDir, '.muil/.babelrc');
const getTemplatesDirectory = (directory) => path.resolve(rootDir, directory);
const buildStaticDirectory = path.resolve(rootDir, 'muil-static');

module.exports = {
  rootDir,
  configurationDirectory,
  configFile,
  buildDirectory,
  configPath,
  babelrcPath,
  getTemplatesDirectory,
  buildStaticDirectory,
};
