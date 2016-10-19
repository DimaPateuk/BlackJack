var gm = require('gm');

gm(__dirname + '/img.png')
.resize(25, 50)
.autoOrient()
.write(__dirname + '/output.png', function (err) {
  console.log(err);
});