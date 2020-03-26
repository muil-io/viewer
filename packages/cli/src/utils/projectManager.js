import prompts from 'prompts';
import { getProjects } from '../services/api';
import * as logger from './logger';

export const selectProject = async ({ token }) => {
  const projects = await getProjects({ token });

  if (projects.length === 0) {
    logger.error(`No projects`);
    return;
  }

  if (projects.length === 1) {
    return projects[0].value;
  }

  const { projectId } = await prompts({
    type: 'select',
    name: 'projectId',
    message: `Select a project`,
    choices: projects,
  });
  return projectId;
};
