import fs from 'fs';
import { configFile } from './paths';
import * as logger from './logger';

const getConfigFile = () => {
  if (!fs.existsSync(configFile)) {
    logger.error(`.muilrc is not exists!`);
    return null;
  }

  return configFile;
};

export const getToken = () => {
  const file = getConfigFile();
  if (!file) {
    return null;
  }

  try {
    const { apiKey } = JSON.parse(fs.readFileSync(file, 'utf8'));
    return apiKey;
  } catch (err) {
    logger.error(`No api key exists!`);
    return null;
  }
};

export const getHost = () => {
  const file = getConfigFile();
  if (!file) {
    return null;
  }

  try {
    const { host } = JSON.parse(fs.readFileSync(file, 'utf8'));

    return host;
  } catch (err) {
    logger.error(`No host exists!`);
    return null;
  }
};
