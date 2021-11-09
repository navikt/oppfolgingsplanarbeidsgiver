const path = require('path');

const express = require('express');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extensions = ['.tsx', '.jsx', '.js', '.ts', '.json'];
const { mockForLokaltMiljo, mockForOpplaeringsmiljo } = require('./mock/mockEndepunkter');
const CopyPlugin = require('copy-webpack-plugin');

const setupDev = async (app, compiler) => {
  mockForOpplaeringsmiljo(app);
  mockForLokaltMiljo(app);
  app.use('/syk/oppfolgingsplanarbeidsgiver/static/', express.static(path.resolve(__dirname, 'dist')));

  app.use('*', (req, res) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        res.status(404).sendFile(path.resolve(__dirname, 'public/error.html'));
        return;
      }

      res.set('Content-Type', 'text/html');
      res.send(result);
      res.end();
    });
  });
};

module.exports = {
  entry: './js/index.tsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/syk/oppfolgingsplanarbeidsgiver/static/',
    filename: 'bundle.js',
    clean: true,
  },
  mode: 'development',
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
    plugins: [
      new TsconfigPathsPlugin({
        extensions,
      }),
    ],
    extensions,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(js|ts|tsx)$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
      {
        test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico|mp4)$/,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080,
    onAfterSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      setupDev(devServer.app, devServer.compiler);
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      hash: true,
    }),
    new CopyPlugin({ patterns: [{ from: 'filmtekster' }] }),
    new Dotenv(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './js/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
};
