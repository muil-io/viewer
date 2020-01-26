const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const login = async ({ email, password }) => {
  const { data: token } = await axios.post('http://3.20.13.157/api/v1/login', {
    email,
    password,
  });

  if (typeof token !== 'string') {
    throw new Error('Wrong email or password');
  }

  return token;
};

const upload = async ({ rootDir, token }) => {
  const bodyData = new FormData();
  const files = await fs.readdirSync(path.resolve(rootDir, 'build'));

  files.forEach(file => bodyData.append('templateFile', fs.createReadStream(path.resolve(rootDir, 'build', file))));

  await axios.post('http://3.20.13.157/api/v1/template', bodyData, {
    headers: { ...bodyData.getHeaders(), Authorization: `Bearer ${token}` },
  });
};

module.exports = {
  login,
  upload,
};
