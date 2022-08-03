const chalk = require('chalk');
const express = require('express');
const path = require('path');
const open = require('open');
const bodyParser = require('body-parser');
const webpackHotMiddleware = require('webpack-hot-middleware');
const build = require('@muil/cli/src/commands/build');
const { buildDirectory } = require('@muil/cli/src/utils/paths');
const { renderTemplate } = require('@muil/templates-renderer');
const viewerMiddleware = require('./viewerMiddleware');

const app = express();

module.exports = async (program) => {
  program.parse();
  const { port, templatesDirectory } = program.opts();

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
      return res.status(500).send({ error: err ? err.message : '' });
    }
  });

  middleware.waitUntilValid(() => {
    app.listen(port, () => console.log(`✨ Muil templates viewer is running at http://localhost:${port}/`));
    open(`http://localhost:${port}`);
  });
};
