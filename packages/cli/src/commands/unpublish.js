import prompts from 'prompts';
import { unpublish } from '../services/api';
import { getToken } from '../utils/credentials';
import * as logger from '../utils/logger';
import { selectProject } from '../utils/projectManager';

export default async ({ branch }) => {
  const token = await getToken();
  if (!token) return;

  const projectId = await selectProject({ token });
  if (!projectId) return;

  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `Are you sure you want to unpublish ${branch ? `branch '${branch}'` : 'master templates'}?`,
    initial: false,
  });
  if (!confirm) return;

  await unpublish({ token, projectId, branch });
  logger.success('Templates unpublished successfully\n');
};
