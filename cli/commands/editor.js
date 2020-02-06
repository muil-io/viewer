import chalk from 'chalk';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import storyConfig from '../../webpack.config.js';

export default async ({ port = 8000 }) => {
  console.log(chalk.inverse('\n Starting Muil editor... \n'));

  const rootDir = process.env.INIT_CWD || '.';

  const compiler = webpack(storyConfig({ rootDir }));
  const server = new WebpackDevServer(compiler, {
    quiet: true,
    overlay: true,
    open: 'Google Chrome',
  });

  server.listen(port, 'localhost', () =>
    console.log(chalk.cyan(`\nMuil editor is running at http://localhost:${port}/`)),
  );
};
