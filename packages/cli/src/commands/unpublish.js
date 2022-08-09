const prompts = require('prompts');
const { unpublish } = require('../services/api');
const { getToken } = require('../utils/credentials');
const logger = require('../utils/logger');

module.exports = async ({ branch }) => {
  const token = await getToken();
  if (!token) return;

  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `Are you sure you want to unpublish ${branch ? `branch '${branch}'` : 'master templates'}?`,
    initial: false,
  });
  if (!confirm) return;

  await unpublish({ token, branch });
  logger.success('Templates unpublished successfully\n');
};
