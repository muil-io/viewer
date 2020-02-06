import program from 'commander';
import initiate from './commands/init';
import login from './commands/login';
import publish from './commands/publish';
import editor from './commands/editor';

program
  .command('init')
  .description('Initialize Muil into project.')
  .option('-n --use-npm', 'Use npm to install deps')
  .action(options => initiate(options));

program
  .command('editor')
  .description('Starting Muil editor.')
  .option('-p --port <port>', 'Editor port')
  .action(options => editor(options));

program
  .command('login')
  .description('Login to Muil.')
  .option('-u --user <user>', 'Username')
  .option('-p --pass <pass>', 'Password')
  .action(options => login(options));

program
  .command('publish')
  .description('Publish email templates.')
  .action(options => publish(options));

program.usage('<command> [options]').parse(process.argv);

// editor
// logout
// unpublish
