const fs = require('fs');
const paths = require('./paths');
const logger = require('./logger');

const getConfigKey = (key, nullable) => {
  if (!fs.existsSync(paths.configFile)) {
    if (!nullable) logger.error(`.muilrc is not exists!`);
    return null;
  }

  try {
    const configuration = JSON.parse(fs.readFileSync(paths.configFile, 'utf8'));
    return configuration[key];
  } catch (err) {
    logger.error(`.muilrc is not a valid json!`);
    return null;
  }
};

const getToken = (nullable = false) => {
  const apiKey = getConfigKey('apiKey', nullable);

  if (!apiKey) {
    if (!nullable) logger.error(`No api key exists!`);
    return null;
  }

  return apiKey;
};

const getHost = () => (getConfigKey('host') ? `${getConfigKey('host')}/api` : null);

module.exports = {
  getToken,
  getHost,
};
