import program from 'commander';
import editor from './editor';

program
  .name('muil')
  .option('-p --port <port>', 'Editor port, default: 8000', 8000)
  .option(
    '-d --templatesDirectory <templatesDirectory>',
    "Templates root directory, default: './templates'",
    './templates',
  )
  .parse(process.argv);

editor(program);
