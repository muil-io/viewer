const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const md5 = require('crypto-js/md5');
const paths = require('../utils/paths');
const { getHost } = require('../utils/credentials');
const logger = require('../utils/logger');

const getBaseUrl = () => getHost() || 'https://app.muil.io/api';

axios.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (!err.response || err.response.status !== 200) {
      const host = getBaseUrl();
      logger.error(`Host ${host} is not accepting the request. please check host or change to valid api key`);
      if (err.response.data) console.log(err.response.data);
    }
    throw err;
  },
);

const publish = async ({ token, branch = '' }) => {
  const bodyData = new FormData();
  const files = await fs.readdirSync(paths.buildDirectory);

  files.forEach((file) => bodyData.append('file', fs.createReadStream(path.resolve(paths.buildDirectory, file))));

  await axios.put(`${getBaseUrl()}/templates/${branch}`, bodyData, {
    headers: { ...bodyData.getHeaders(), 'x-api-key': token },
  });
};

const unpublish = async ({ token, branch = '' }) => {
  const bodyData = new FormData();

  await axios.delete(`${getBaseUrl()}/templates/${branch}`, {
    headers: { ...bodyData.getHeaders(), 'x-api-key': token },
  });
};

const uploadAsset = async ({ token, assetPath }) => {
  const filename = `${md5(assetPath)}.${assetPath.split('.').pop()}`;

  const bodyData = new FormData();
  bodyData.append('file', fs.createReadStream(assetPath), { filename });

  const {
    data: { url },
  } = await axios.post(`${getBaseUrl()}/assets/${filename}`, bodyData, {
    headers: { ...bodyData.getHeaders(), 'x-api-key': token },
  });

  return url;
};

const cloudSettings = async ({ token }) =>
  axios.get(`${getBaseUrl()}/assetsSettings`, { headers: { 'x-api-key': token } });

module.exports = { cloudSettings, uploadAsset, unpublish, publish };
