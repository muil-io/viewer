import program from 'commander';
import initiate from './commands/init';
import login from './commands/login';
import logout from './commands/logout';
import publish from './commands/publish';
import unpublish from './commands/unpublish';
import build from './commands/build';
import apikey from './commands/apikey';

program
  .command('init')
  .description('Initialize Muil into project')
  .option('-n --use-npm', 'Use npm to install deps')
  .option('-d --templatesDirectory <templatesDirectory>', 'Templates root directory')
  .action(options => initiate(options));

program
  .command('login')
  .description('Login to Muil')
  .option('-u --user <user>', 'Username')
  .option('-p --pass <pass>', 'Password')
  .action(options => login(options));

program
  .command('logout')
  .description('Logout from Muil')
  .action(() => logout());

program
  .command('publish')
  .description('Publish email templates')
  .option('-d --templatesDirectory <templatesDirectory>', 'Templates root directory', './templates')
  .option('-b --branch <branch>', 'templates branch (default: "master")')
  .option('-e --templatesExtension <templatesExtension>', 'comma separated list of templates path', 'template.js')
  .action(options => publish(options));

program
  .command('unpublish')
  .description('Unpublish email templates')
  .option('-b --branch <branch>', 'templates branch (default: "master")')
  .action(options => unpublish(options));

program
  .command('build')
  .description('Build email templates')
  .option('-d --templatesDirectory <templatesDirectory>', 'Templates root directory', './templates')
  .option('-e --templatesExtension <templatesExtension>', 'comma separated list of templates path', 'template.js')
  .action(options => build(options));

program
  .command('apikey')
  .description('API keys management')
  .action(options => apikey(options));

program
  .name('muil')
  .usage('<command> [options]')
  .parse(process.argv);

if (program.rawArgs.length < 3) {
  program.help();
}
