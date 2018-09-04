const screenCaptureToJimp = require('./screenUtils/screenCaptureToJimp.js');

screenCaptureToJimp().then((Jimp) => {
  Jimp.write('t.png');
})
