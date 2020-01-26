#!/usr/bin/env node

['react'].forEach(dependency => {
  try {
    require.resolve(dependency);
  } catch (err) {
    console.warn(`The module '${dependency}' was not found.`);
  }
});

const runDevServer = require('./devServer');
const runCompiler = require('./compiler');
const { login, upload } = require('./api');
const ask = require('./question');

const defaultCommand = 'dev';
const rootDir = process.env.INIT_CWD || '..';
const port = 8080;

const errorColor = '\x1b[31m%s\x1b[0m';
const successColor = '\x1b[32m%s\x1b[0m';

const commands = {
  dev: async () => {
    console.log('Starting story mail...');
    await runDevServer(rootDir, port);
    console.log(`dev server listening on port ${port}`);
  },
  publish: async () => {
    try {
      console.log('Please enter email and password to login');
      const email = await ask('Email: ', 'Must enter email');
      const password = await ask('Password: ', 'Must enter password', true);

      console.log('\nLogin...');
      const token = await login({ email, password });
      console.log(successColor, 'Successfully logged in!\n');

      console.log('Compile templates...');
      await runCompiler(rootDir);
      console.log(successColor, 'Successfully complied!\n');

      console.log('Uploading templates...');
      await upload({ rootDir, token });
      console.log(successColor, 'Successfully uploaded!\n');
    } catch (err) {
      console.log(errorColor, err);
    }
  },
};

const args = process.argv.slice(2);

commands[args.length ? args[0] : defaultCommand]();
