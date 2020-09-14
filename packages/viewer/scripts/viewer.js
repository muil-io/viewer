import chalk from 'chalk';
import express from 'express';
import open from 'open';
import webpackHotMiddleware from 'webpack-hot-middleware';
import viewerMiddleware from './viewerMiddleware';

const app = express();

export default async ({ port, templatesDirectory }) => {
  console.log(`${chalk.inverse('\n Starting Muil viewer... \n')}`);

  const { middleware, compiler, viewerDirectory } = viewerMiddleware({ templatesDirectory });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(viewerDirectory));

  middleware.waitUntilValid(() => {
    app.listen(port, () => console.log(`✨ Muil templates viewer is running at http://localhost:${port}/`));
    open(`http://localhost:${port}`);
  });
};
