const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const login = async ({ email, password }) => {
  const { data: token } = await axios.post('https://us-central1-muil-io.cloudfunctions.net/auth/login', {
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

  await axios.post('https://us-central1-muil-io.cloudfunctions.net/templates', bodyData, {
    headers: { ...bodyData.getHeaders(), Authorization: `Bearer ${token}` },
  });
};

const sendEmail = async ({ token, template }) => {
  await axios.post(
    'https://us-central1-muil-io.cloudfunctions.net/templates/email',
    {
      templateId: template,
      subject: template,
      to: 'nir@muil.io',
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

module.exports = {
  login,
  upload,
  sendEmail,
};
