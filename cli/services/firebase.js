import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

export const login = async ({ email, password }) => {
  const { data: token } = await axios.post('https://us-central1-muil-io.cloudfunctions.net/auth/login', {
    email,
    password,
  });

  return token;
};

export const upload = async ({ rootDir, token }) => {
  const bodyData = new FormData();
  const files = await fs.readdirSync(path.resolve(rootDir, 'build'));

  files.forEach(file => bodyData.append('templateFile', fs.createReadStream(path.resolve(rootDir, 'build', file))));

  await axios.post('https://us-central1-muil-io.cloudfunctions.net/templates', bodyData, {
    headers: { ...bodyData.getHeaders(), Authorization: `Bearer ${token}` },
  });
};
