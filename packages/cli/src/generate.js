import program from 'commander';
import initiate from './commands/init';
import publish from './commands/publish';
import unpublish from './commands/unpublish';
import build from './commands/build';
import buildStatic from './commands/buildStatic';

program
  .command('init')
  .description('Initialize Muil into project')
  .option('-n --use-npm', 'Use npm to install deps')
  .option('-d --templatesDirectory <templatesDirectory>', 'Templates root directory')
  .action((options) => initiate(options));

program
  .command('publish')
  .description('Publish email templates')
  .option('-d --templatesDirectory <templatesDirectory>', 'Templates root directory', './templates')
  .option('-b --branch <branch>', 'templates branch (default: "master")')
  .option('-f --force', 'publish without prompts for additional input')
  .action((options) => publish(options));

program
  .command('unpublish')
  .description('Unpublish email templates')
  .option('-b --branch <branch>', 'templates branch (default: "master")')
  .action((options) => unpublish(options));

program
  .command('build')
  .description('Build email templates')
  .option('-d --templatesDirectory <templatesDirectory>', 'Templates root directory', './templates')
  // aws
  .option('--aws_access_key_id <aws_access_key_id>', 'aws access key id')
  .option('--aws_secrete_access_key <aws_secrete_access_key>', 'aws secrete access key')
  .option('--aws_bucket_name <aws_bucket_name>', 'aws aws_bucket_name')
  // gcs
  .option('--gcs_key_file_path <gcs_key_file_path>', 'google cloud .json credential file path')
  .option('--gsc_bucket_name <gsc_bucket_name>', 'google cloud storage bucket name')
  // azure
  .option('--azure_account_name <azure_account_name>', 'azure account name')
  .option('--azure_account_key <azure_account_key>', 'azure account key')
  .option('--azure_share_name <azure_share_name>', 'azure share name')
  .option('--azure_dir_name <azure_dir_name>', 'azure dir name')

  .action((options) => build(options));

program
  .command('build-static')
  .description('Build email templates static')
  .option('-d --templatesDirectory <templatesDirectory>', 'Templates root directory', './templates')
  .action((options) => buildStatic(options));

program.name('muil').usage('<command> [options]').parse(process.argv);

if (program.rawArgs.length < 3) {
  program.help();
}
