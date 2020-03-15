const path = require('path');

const paths = {
  src: path.resolve(__dirname, 'src/index.js'),
  dist: path.resolve(__dirname, 'lib'),
};

module.exports = {
  entry: paths.src,
  mode: 'production',
  devtool: 'none',
  output: {
    filename: 'index.js',
    path: paths.dist,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
