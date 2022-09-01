const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const routes = require('./examples-routes');

const htmlWebpackPlugins = routes.map(
  ({ path, title }) =>
    new HtmlWebpackPlugin({
      templateContent: `
        <html>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </head>
          <body>
            <noscript> You need to enable JavaScript to run this app. </noscript>
            <div id="root"></div>
          </body>
        </html>`,
      filename: '.' + path + '/index.html',
      title,
    })
);

module.exports = {
  entry: path.join(__dirname, 'examples/src/index.tsx'),
  output: {
    path: path.join(__dirname, 'examples/dist'),
    filename: 'bundle.js',
    publicPath: '/react-hooks-use-modal',
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
