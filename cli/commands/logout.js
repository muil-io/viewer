import fs from 'fs';
import { homedir } from 'os';
import * as logger from '../utils/logger';

export default async () => {
  const credentialsFile = `${homedir()}/.muil/credentials`;
  if (!fs.existsSync(credentialsFile)) {
    logger.error('You are not logged in');
    return;
  }

  const { email } = JSON.parse(fs.readFileSync(credentialsFile, 'utf8'));
  fs.unlinkSync(credentialsFile);

  logger.success(`Logged out from ${email}`);
};
