import fs from 'fs';
import { configFile } from './paths';
import * as logger from './logger';

const getConfigKey = (key) => {
  if (!fs.existsSync(configFile)) {
    logger.error(`.muilrc is not exists!`);
    return null;
  }

  try {
    const configuration = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    return configuration[key];
  } catch (err) {
    logger.error(`.muilrc is not a valid json!`);
    return null;
  }
};

export const getToken = () => {
  const apiKey = getConfigKey('apiKey');

  if (!apiKey) {
    logger.error(`No api key exists!`);
    return null;
  }

  return apiKey;
};

export const getHost = () => getConfigKey('host');
