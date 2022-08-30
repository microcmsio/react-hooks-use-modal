const fs = require('fs');
const path = require('path');

const globby = require('globby');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugins = globby.sync(['examples/src/**/index.html']).map(
  (filePath) =>
    new HtmlWebpackPlugin({
      template: path.join(__dirname, filePath),
      filename: filePath.replace('examples/src/', './'),
    })
);

module.exports = {
  entry: path.join(__dirname, 'examples/src/js/index.tsx'),
  output: {
    path: path.join(__dirname, 'examples/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [...htmlWebpackPlugins],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    port: 3001,
  },
};
