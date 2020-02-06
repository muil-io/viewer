const path = require('path');

export const rootDir = process.env.INIT_CWD || __dirname;

export const getTemplatesDirectory = templatesDirectory => path.resolve(rootDir, templatesDirectory);

export const buildDirectory = path.resolve(rootDir, '.muil/build');
