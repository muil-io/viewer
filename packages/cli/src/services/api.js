import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import md5 from 'crypto-js/md5';
import { buildDirectory } from '../utils/paths';
import { getHost } from '../utils/credentials';
import * as logger from '../utils/logger';

const baseUrl = getHost() || 'https://muil.io/api';

axios.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err.response.status !== 200) {
      console.log(err.config);

      logger.error('host is not accepting request. please check host or change to valid api key');
    }
    throw err;
  },
);

export const publish = async ({ token, branch = '' }) => {
  const bodyData = new FormData();
  const files = await fs.readdirSync(buildDirectory);

  files.forEach((file) => bodyData.append('file', fs.createReadStream(path.resolve(buildDirectory, file))));

  await axios.put(`${baseUrl}/templates/${branch}`, bodyData, {
    headers: { ...bodyData.getHeaders(), 'x-api-key': token },
  });
};

export const unpublish = async ({ token, branch = '' }) => {
  const bodyData = new FormData();

  await axios.delete(`${baseUrl}/templates/${branch}`, {
    headers: { ...bodyData.getHeaders(), 'x-api-key': token },
  });
};

export const uploadAsset = async ({ token, assetPath }) => {
  const filename = `${md5(assetPath)}.${assetPath.split('.').pop()}`;

  const bodyData = new FormData();
  bodyData.append('file', fs.createReadStream(assetPath), { filename });

  const {
    data: { url },
  } = await axios.post(`${baseUrl}/assets/${filename}`, bodyData, {
    headers: { ...bodyData.getHeaders(), 'x-api-key': token },
  });

  return url;
};
