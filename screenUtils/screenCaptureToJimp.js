const Jimp = require('jimp');
const robot = require('robotjs');

function screenCaptureToJimp(robotScreenPic) {
  return new Promise((resolve, reject) => {
    try {
      const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
      let pos = 0;
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
      });
      resolve(image);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

module.exports = function () {
  const picture = robot.screen.capture();
  return screenCaptureToJimp(picture);
}
