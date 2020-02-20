import fs from 'fs';
import { getCredentialsFile } from '../utils/credentials';
import * as logger from '../utils/logger';

export default async () => {
  const credentialsFile = getCredentialsFile();
  if (!credentialsFile) return;

  const { email } = JSON.parse(fs.readFileSync(credentialsFile, 'utf8'));
  fs.unlinkSync(credentialsFile);

  logger.success(`Logged out from ${email}`);
};
