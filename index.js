// const sharp = require('sharp');

// sharp('img.png')
//   .resize(25, 50)
//   .extend({top: 10, bottom: 20, left: 10, right: 10})
//   .toFile('output.png', function(err) {
//     console.log(err);
//   });


var gm = require('gm');

gm('img.png')
.resize(25, 50)
.autoOrient()
.write('output.png', function (err) {
  if (!err) console.log(' hooray! ');
});