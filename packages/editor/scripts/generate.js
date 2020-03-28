import program from 'commander';
import editor from './editor';

program
  .name('muil')
  .option('-p --port <port>', 'Editor port', 8000)
  .option('-d --templatesDirectory <templatesDirectory>', 'Templates root directory', './templates')
  .parse(process.argv);

editor(program);
