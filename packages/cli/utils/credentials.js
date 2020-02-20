import fs from 'fs';
import { configurationDirectory, credentialsFile } from './paths';
import { login } from '../services/api';
import * as logger from './logger';

export const setCredentialsFile = ({ email, password }) => {
  if (!fs.existsSync(configurationDirectory)) {
    fs.mkdirSync(configurationDirectory);
  }

  fs.writeFileSync(credentialsFile, `${JSON.stringify({ email, password }, null, 2)}\n`, {
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

  const { email, password } = JSON.parse(fs.readFileSync(file, 'utf8'));
  return login({ email, password });
};
