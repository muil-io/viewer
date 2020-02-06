import program from 'commander';
import initiate from './commands/init';
import login from './commands/login';
import logout from './commands/logout';
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
  .option('-p --port <port>', 'Editor port, default: 8000')
  .option('-d --templatesDirectory <templatesDirectory>', "Templates root directory, default: 'templates'")
  .action(options => editor(options));

program
  .command('login')
  .description('Login to Muil.')
  .option('-u --user <user>', 'Username')
  .option('-p --pass <pass>', 'Password')
  .action(options => login(options));

program
  .command('logout')
  .description('Logout from Muil.')
  .action(() => logout());

program
  .command('publish')
  .description('Publish email templates.')
  .option('-t --template <templates>', 'Templates ID')
  .option('-d --templatesDirectory <templatesDirectory>', "Templates root directory, default: 'templates'")
  .action(options => publish(options));

program.usage('<command> [options]').parse(process.argv);

// unpublish
