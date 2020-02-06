import fs from 'fs';
import { homedir } from 'os';
import { login } from '../services/firebase';
import * as logger from '../utils/logger';
import ask from '../utils/ask';

export default async ({ user, pass }) => {
  const email = user || (await ask('Muil Username: '));
  const password = pass || (await ask('Muil Password: ', true));

  const token = await login({ email, password });
  if (typeof token !== 'string') {
    logger.error('Invalid username or password');
    return;
  }

  const configurationDirectory = `${homedir()}/.muil`;
  if (!fs.existsSync(configurationDirectory)) {
    fs.mkdirSync(configurationDirectory);
  }

  fs.writeFileSync(`${configurationDirectory}/credentials`, `${JSON.stringify({ email, password }, null, 2)}\n`, {
    encoding: 'utf8',
    flag: 'w',
  });

  logger.success('Logged in successfully');
};
