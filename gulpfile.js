var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack');
var webpackConfig = require('./ui/webpack.config.js');
var electron = require('electron-connect').server.create({
  path: path.resolve(__dirname, 'electronSrc/main.js'),
});

var bundler = webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log('--------error');
    console.log(err);
    console.log(stats);
    console.log('--------error');
    return;
  }

  console.log('--------info');
  console.log(stats);
  console.log('--------info');

});


gulp.task('default', function () {
  electron.start();
  gulp.watch('electronSrc/**.js', electron.restart);
  gulp.watch('ui/**/**.*', () => bundler.run(electron.reload));
});
