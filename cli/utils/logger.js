import chalk from 'chalk';

export const title = message => console.log(`${chalk.inverse(message)}`);

export const info = message => process.stdout.write(`${chalk.cyan(' •')} ${message}`);

export const infoSuccess = () => {
  process.stdout.cursorTo(0);
  process.stdout.write(`${chalk.green(' ✔')}\n`);
};

export const success = message => console.log(`${chalk.green(' ✔')} ${message || ''}`);

export const error = message => console.log(`${chalk.red(' ✘')} ${message}`);

export const warn = message => console.log(`${chalk.yellow(' ⚠︎')} ${message}`);
