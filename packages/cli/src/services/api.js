import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import md5 from 'crypto-js/md5';
import { buildDirectory } from '../utils/paths';

const baseUrl = 'https://us-central1-muil-io.cloudfunctions.net';

export const login = async ({ email, password }) => {
  const { data: token } = await axios.post(`${baseUrl}/auth/login`, {
    email,
    password,
  });

  return token;
};

export const publish = async ({ token, branch = '' }) => {
  const bodyData = new FormData();
  const files = await fs.readdirSync(buildDirectory);

  files.forEach(file => bodyData.append('templateFile', fs.createReadStream(path.resolve(buildDirectory, file))));

  await axios.put(`${baseUrl}/templates/${branch}`, bodyData, {
    headers: { ...bodyData.getHeaders(), Authorization: `Bearer ${token}` },
  });
};

export const unpublish = async ({ token, branch = '' }) => {
  const bodyData = new FormData();

  await axios.delete(`${baseUrl}/templates/${branch}`, {
    headers: { ...bodyData.getHeaders(), Authorization: `Bearer ${token}` },
  });
};

export const uploadAsset = async ({ token, assetPath }) => {
  const filename = `${md5(assetPath)}.${assetPath.split('.').pop()}`;

  const bodyData = new FormData();
  bodyData.append('file', fs.createReadStream(assetPath), { filename });

  return axios.post(`${baseUrl}/assets/${filename}`, bodyData, {
    headers: { ...bodyData.getHeaders(), Authorization: `Bearer ${token}` },
  });
};
