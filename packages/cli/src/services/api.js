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
    if (err.response.status === 403) {
      logger.error('host is not accepting request. please check host or change to valid api key');
    }
    throw err;
  },
);

export const publish = async ({ token, projectId, branch = '' }) => {
  const bodyData = new FormData();
  const files = await fs.readdirSync(buildDirectory);

  files.forEach((file) => bodyData.append('templateFile', fs.createReadStream(path.resolve(buildDirectory, file))));

  await axios.put(`${baseUrl}/templates/${projectId}/${branch}`, bodyData, {
    headers: { ...bodyData.getHeaders(), Authorization: `Bearer ${token}` },
  });
};

export const unpublish = async ({ token, projectId, branch = '' }) => {
  const bodyData = new FormData();

  await axios.delete(`${baseUrl}/templates/${projectId}/${branch}`, {
    headers: { ...bodyData.getHeaders(), Authorization: `Bearer ${token}` },
  });
};

export const uploadAsset = async ({ token, projectId, assetPath }) => {
  const filename = `${md5(assetPath)}.${assetPath.split('.').pop()}`;

  const bodyData = new FormData();
  bodyData.append('file', fs.createReadStream(assetPath), { filename });

  const {
    data: {
      data: { url },
    },
  } = await axios.post(`${baseUrl}/assets/${projectId}/${filename}`, bodyData, {
    headers: { ...bodyData.getHeaders(), Authorization: `Bearer ${token}` },
  });

  return url;
};

export const getProjects = async ({ token }) => {
  const {
    data: { data: projects },
  } = await axios.get(`${baseUrl}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return projects.map(({ id, name }) => ({ title: name, value: id }));
};
