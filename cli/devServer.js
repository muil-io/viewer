const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const storyConfig = require('../story.config.js');

const runDevServer = (rootDir, port) =>
  new Promise((resolve, reject) => {
    try {
      const compiler = webpack(storyConfig({ rootDir }));
      const server = new WebpackDevServer(compiler, { open: true });

      server.listen(port, 'localhost', () => {
        resolve(port);
      });
    } catch (err) {
      reject(err);
    }
  });

module.exports = runDevServer;
