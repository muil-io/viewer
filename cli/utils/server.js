import WebpackDevServer from 'webpack-dev-server';

const server = ({ compiler, options, port }) =>
  new Promise((res, rej) => {
    const devServer = new WebpackDevServer(compiler, options);
    devServer.listen(port, 'localhost', err => {
      if (err) {
        rej(err);
      }
      res();
    });
  });

export default server;
