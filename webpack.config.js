const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');

const outputDirName = 'build';
const staticDirName = 'public';

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, staticDirName),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js|\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({ template: path.join(__dirname, 'public', 'index.html') }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'public', 'index.css'),
          to: path.resolve(__dirname, outputDirName),
        },
        {
          from: path.join(__dirname, 'public', 'worker.js'),
          to: path.resolve(__dirname, outputDirName),
        },
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, outputDirName),
    filename: 'main.js',
  },
};
