import chalk from 'chalk';
import express from 'express';
import path from 'path';
import open from 'open';
import bodyParser from 'body-parser';
import webpackHotMiddleware from 'webpack-hot-middleware';
import build from '@muil/cli/src/commands/build';
import { buildDirectory } from '@muil/cli/src/utils/paths';
import { renderTemplate } from '@muil/templates-renderer';
import viewerMiddleware from './viewerMiddleware';

const app = express();

export default async ({ port, templatesDirectory }) => {
  console.log(`${chalk.inverse('\n Starting Muil viewer... \n')}`);

  const { middleware, compiler, viewerDirectory } = viewerMiddleware({ templatesDirectory });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(viewerDirectory));

  // internal post request to build and render template
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.post('/api/renderTemplate', async (req, res) => {
    const { id, props, type } = req.body;
    try {
      await build({ templateId: id, templatesDirectory, suppressLogs: true });
      const data = await renderTemplate({
        type,
        sandbox: false,
        templatePath: path.resolve(buildDirectory, `${id.toLowerCase()}.js`),
        templateCssPath: path.resolve(buildDirectory, `${id.toLowerCase()}.css`),
        props,
      });

      switch (type) {
        case 'html':
          res.set('Content-Type', 'text/html');
          break;
        case 'png':
          res.set('Content-Type', 'image/png');
          break;
        case 'pdf':
          res.set('Content-Type', 'application/pdf');
          break;
        default:
          res.set('Content-Type', 'text/html');
          break;
      }

      return res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  });

  middleware.waitUntilValid(() => {
    app.listen(port, () => console.log(`✨ Muil templates viewer is running at http://localhost:${port}/`));
    open(`http://localhost:${port}`);
  });
};
