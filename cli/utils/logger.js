import chalk from 'chalk';

export const title = message => console.log(`${chalk.inverse(message)}`);

export const info = message => console.log(`${chalk.blue('ℹ')} ${message}`);

export const success = message => console.log(`${chalk.green('✔')} ${message}`);

export const error = message => console.log(`${chalk.red('✘')} ${message}`);

export const warn = message => console.log(`${chalk.yellow('⚠︎')} ${message}`);
