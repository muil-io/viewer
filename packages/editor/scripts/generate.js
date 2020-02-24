import program from 'commander';
import editor from './editor';

program
  .command('editor')
  .description('Starting Muil editor')
  .option('-p --port <port>', 'Editor port, default: 8000', 8000)
  .option(
    '-d --templatesDirectory <templatesDirectory>',
    "Templates root directory, default: './templates'",
    './templates',
  )
  .action(options => editor(options));

program
  .name('muil')
  .usage('<command> [options]')
  .parse(process.argv);

if (program.rawArgs.length < 3) {
  program.help();
}
