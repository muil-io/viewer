import path from 'path';
import { homedir } from 'os';

export const rootDir = process.env.INIT_CWD || __dirname;

export const configurationDirectory = `${homedir()}/.muil`;

export const credentialsFile = `${homedir()}/.muil/credentials`;

export const buildDirectory = path.resolve(rootDir, '.muil/build');

export const configPath = path.resolve(rootDir, '.muil/config.js');

export const babelrcPath = path.resolve(rootDir, '.muil/.babelrc');

export const getTemplatesDirectory = (directory) => path.resolve(rootDir, directory);

export const buildStaticDirectory = path.resolve(rootDir, '.muil/static');
