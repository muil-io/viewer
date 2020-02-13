import prompts from 'prompts';
import { login } from '../services/api';
import { setCredentialsFile } from '../utils/credentials';
import * as logger from '../utils/logger';

export default async ({ user, pass }) => {
  prompts.override({ email: user, password: pass });
  const { email, password } = await prompts(
    [
      {
        type: 'text',
        name: 'email',
        message: 'username:',
        validate: e => (e !== '' ? true : 'Please enter a username'),
      },
      {
        type: 'password',
        name: 'password',
        message: 'password:',
        validate: e => (e !== '' ? true : 'Please enter a password'),
      },
    ],
    {
      onCancel: () => {
        process.exit();
      },
    },
  );

  const token = await login({ email, password });
  if (typeof token !== 'string') {
    logger.error('Invalid username or password');
    return;
  }

  setCredentialsFile({ email, password });

  logger.success('Logged in successfully');
};
