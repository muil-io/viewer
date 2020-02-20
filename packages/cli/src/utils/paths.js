const path = require('path');
const { homedir } = require('os');

const rootDir = process.env.INIT_CWD || __dirname;

const configurationDirectory = `${homedir()}/.muil`;

const credentialsFile = `${homedir()}/.muil/credentials`;

const buildDirectory = path.resolve(rootDir, '.muil/build');

const distDirectory = path.resolve(rootDir, '.muil/dist');

const getTemplatesDirectory = directroy => path.resolve(rootDir, directroy);

module.exports = {
  rootDir,
  configurationDirectory,
  credentialsFile,
  buildDirectory,
  distDirectory,
  getTemplatesDirectory,
};
