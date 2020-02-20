import path from 'path';
import express from 'express';
import opn from 'opn';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import previewConfig from '../webpack.config.preview';

const rootDir = process.env.INIT_CWD || __dirname;
const distDirectory = path.resolve(__dirname, '../lib');
const app = express();

const editor = async ({ port = 8000, templatesDirectory = './templates' }) => {
  const compiler = webpack(previewConfig({ templatesDirectory: path.resolve(rootDir, templatesDirectory) }));
  const middleware = new webpackDevMiddleware(compiler, {
    publicPath: '/',
    writeToDisk: true,
    noInfo: true,
    aggregateTimeout: 1,
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(distDirectory));

  middleware.waitUntilValid(() => {
    app.listen(port, () => console.log(`✨ Muil editor is running at http://localhost:${port}/`));
    opn(`http://localhost:${port}`);
  });
};

editor({});
