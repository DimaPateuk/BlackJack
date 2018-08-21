const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:9000/',
    'webpack/hot/dev-server',
    path.join(__dirname, './index.js'),
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    hot: true,
		inline: false,
    port: 9000,
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    open: true,
    hotOnly: true,
    openPage: 'index.html',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
	},
  plugins: [
		new webpack.HotModuleReplacementPlugin(),
  ],
};
