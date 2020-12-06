import fs from 'fs';
import { configFile } from './paths';
import * as logger from './logger';

const getConfigKey = (key, nullable) => {
  if (!fs.existsSync(configFile)) {
    if (!nullable) logger.error(`.muilrc is not exists!`);
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

export const getToken = (nullable = false) => {
  const apiKey = getConfigKey('apiKey', nullable);

  if (!apiKey) {
    if (!nullable) logger.error(`No api key exists!`);
    return null;
  }

  return apiKey;
};

export const getHost = () => getConfigKey('host');
