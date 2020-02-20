import path from 'path';
import { homedir } from 'os';

export const rootDir = process.env.INIT_CWD || __dirname;

export const configurationDirectory = `${homedir()}/.muil`;

export const credentialsFile = `${homedir()}/.muil/credentials`;

export const buildDirectory = path.resolve(rootDir, '.muil/build');

export const getTemplatesDirectory = directroy => path.resolve(rootDir, directroy);