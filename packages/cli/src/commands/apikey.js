import prompts from 'prompts';
import { getToken } from '../utils/credentials';
import * as logger from '../utils/logger';
import { selectProject } from '../utils/projectManager';
import { createNewKey, enableOrDisableKey } from '../services/api';

export default async () => {
  const { choice } = await prompts({
    type: 'select',
    name: 'choice',
    message: `What would you like to do?`,
    choices: [
      { title: 'Generate a new api key', value: 'new' },
      { title: 'Enable an api key', value: 'enable' },
      { title: 'Disable an api key', value: 'disable' },
    ],
  });

  if (!choice) return;

  const token = await getToken();
  if (!token) return;

  const projectId = await selectProject({ token });
  if (!projectId) return;

  if (choice === 'new') {
    const { name } = await prompts({
      type: 'text',
      name: 'name',
      message: 'Enter a key name',
      validate: (e) => (e !== '' ? true : 'Please enter a key name'),
    });

    logger.info('Generating a new api key...');
    const { id, apiKey } = await createNewKey({ token, projectId, name });
    logger.infoSuccess();
    logger.success(`key: ${apiKey}`);
    logger.success(`id: ${id}\n`);
    logger.info('Use this key in your application by passing it in X-API-Key header.\n');
    logger.title('Note that this API key *will only be displayed now* you will not be able to recover it.\n\n');
    return;
  }

  if (choice === 'enable' || choice === 'disable') {
    const { prefix } = await prompts({
      type: 'text',
      name: 'prefix',
      message: 'Enter a key id',
      validate: (e) => (e !== '' ? true : 'Please enter a key id'),
    });

    logger.info(`${choice === 'enable' ? 'Enabling' : 'Disabling'} api key...`);
    await enableOrDisableKey({ token, projectId, prefix, enable: choice === 'enable' });
    logger.infoSuccess();
  }
};
