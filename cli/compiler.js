const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const runCompiler = rootDir =>
  new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig({ rootDir }));

    compiler.run(async (err, stats) => {
      if (err) {
        return reject(err);
      }

      return resolve(stats.toString({ chunks: false, colors: true }));
    });
  });

module.exports = runCompiler;
