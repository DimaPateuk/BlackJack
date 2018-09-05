const path = require('path');
const fs = require('fs');
const screenCaptureToJimp = require('../screenUtils/screenCaptureToJimp');
const detector = require('../src/detector');

function createCordinates ({ winX, winY, boxes }) {
  return Object.entries(boxes)
    .map(([key, box]) => {
      return Object.assign({}, box, {
        x: box.x + winX,
        y: box.y + winY,
        path: path.resolve(__dirname, `boxImages/${box.id}.png`),
      });
    });
}

function saveImages (screen, cordinates) {
  const result = [];

  for (let i = 0; i < cordinates.length; i++) {
    const { x, y, width, height, id, path } = cordinates[i];
    const promise = screen
      .clone()
      .crop(x, y, width, height)
      .writeAsync(path);
    result.push(promise);
  }

  return Promise.all(result);
}

function init ({ winX, winY, boxes }) {
  screenCaptureToJimp().then((screen) => {
    const cordinates = createCordinates({ winX, winY, boxes });
    saveImages(screen, cordinates)
      .then(() => {
        cordinates.forEach(({ path }) => {
          detector.predict(path)
            // .then((prediction) => {
            //   fs.writeFile(path.resolve(__dirname, path, '.prediction'), JSON.stringify(prediction));
            // })
        });
      })
  })
}

module.exports = { init: init };
