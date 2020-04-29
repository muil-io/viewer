import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import md5 from 'crypto-js/md5';
import { buildDirectory } from '../utils/paths';

const baseUrl = 'https://us-central1-muil-io.cloudfunctions.net/v1';

export const login = async ({ email, password, refreshToken }) => {
  try {
    const {
      data: { data },
    } = await axios.post(
      `${baseUrl}/auth/${refreshToken ? 'refreshToken' : 'login'}`,
      refreshToken ? { refreshToken } : { email, password },
    );

    return data;
  } catch (err) {
    // empty
  }
};

export const fetchRefreshToken = async ({ email, password }) => {
  const data = await login({ email, password });
  return data ? data.refreshToken : null;
};

export const publish = async ({ token, projectId, branch = '' }) => {
  const bodyData = new FormData();
  const files = await fs.readdirSync(buildDirectory);

  files.forEach(file => bodyData.append('templateFile', fs.createReadStream(path.resolve(buildDirectory, file))));

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

export const createNewKey = async ({ token, projectId, name }) => {
  const {
    data: {
      data: { id, apiKey },
    },
  } = await axios.post(
    `${baseUrl}/apiKeys/${projectId}`,
    { name },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return { id, apiKey };
};

export const enableOrDisableKey = async ({ token, projectId, prefix, enable }) =>
  axios.post(
    `${baseUrl}/apiKeys/${projectId}/${prefix}/${enable ? 'enable' : 'disable'}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
