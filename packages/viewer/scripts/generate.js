import program from 'commander';
import viewer from './viewer';

program
  .name('muil')
  .option('-p --port <port>', 'Viewer port', 8000)
  .option('-d --templatesDirectory <templatesDirectory>', 'Templates root directory', './templates')
  .parse(process.argv);

viewer(program);
