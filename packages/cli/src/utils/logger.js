const chalk = require('chalk');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.close();

const title = (message) => console.log(`${chalk.inverse(message)}`);

const info = (message) => process.stdout.write(`${chalk.cyan(' •')} ${message}`);

const infoSuccess = () => {
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(`${chalk.green(' ✔')}\n`);
};

const success = (message) => console.log(`${chalk.green(' ✔')} ${message || ''}`);

const error = (message) => console.log(`${chalk.red(' ✘')} ${message}`);

const warn = (message) => console.log(`${chalk.yellow(' ⚠︎')} ${message}`);

module.exports = {
  title,
  info,
  infoSuccess,
  success,
  error,
  warn,
};
