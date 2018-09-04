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
  resolve: {
    alias: {
			ui: __dirname,
		},
		extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
		new webpack.HotModuleReplacementPlugin(),
  ],
};
