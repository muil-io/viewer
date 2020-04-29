import fs from 'fs';
import { configurationDirectory, credentialsFile } from './paths';
import { login } from '../services/api';
import * as logger from './logger';

export const setCredentialsFile = ({ email, accessKey }) => {
  if (!fs.existsSync(configurationDirectory)) {
    fs.mkdirSync(configurationDirectory);
  }

  fs.writeFileSync(credentialsFile, `${JSON.stringify({ email, accessKey }, null, 2)}\n`, {
    encoding: 'utf8',
    flag: 'w',
  });
};

export const getCredentialsFile = () => {
  if (!fs.existsSync(credentialsFile)) {
    logger.error(`You are not logged in`);
    return null;
  }

  return credentialsFile;
};

export const getToken = async () => {
  const file = getCredentialsFile();
  if (!file) {
    return null;
  }

  try {
    const { accessKey: refreshToken } = JSON.parse(fs.readFileSync(file, 'utf8'));
    const { token } = await login({ refreshToken });

    return token;
  } catch (err) {
    logger.error(`You are not logged in`);
    return null;
  }
};
