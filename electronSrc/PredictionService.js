const path = require('path');
const fs = require('fs');
const screenCaptureToJimp = require('../screenUtils/screenCaptureToJimp');
const createClassifier = require('../src/detector');

const detectorPromise = createClassifier();

function createCordinates ({ winX, winY, boxes }) {
  return Object.entries(boxes)
    .map(([key, box]) => {
      return Object.assign({}, box, {
        x: box.x + winX,
        y: box.y + winY,
        pathToFile: path.resolve(__dirname, `boxImages/${box.id}.png`),
      });
    });
}

function saveImages (screen, cordinates) {
  const result = [];

  for (let i = 0; i < cordinates.length; i++) {
    const { x, y, width, height, id, pathToFile } = cordinates[i];
    const promise = screen
      .clone()
      .crop(x, y, width, height)
      .writeAsync(pathToFile);
    result.push(promise);
  }

  return Promise.all(result);
}

async function init ({ winX, winY, boxes }) {
  const screen = await screenCaptureToJimp()
  const cordinates = createCordinates({ winX, winY, boxes });
  await saveImages(screen, cordinates);
  const detector = await detectorPromise;
  const result = [];
  for (let i = 0; i < cordinates.length; i++) {
    const { pathToFile, id } = cordinates[i];
    const prediction = await detector.predict(pathToFile);
    result.push({
      prediction,
      id
    });
  }

  return result;
}

module.exports = { init: init, donePromise: detectorPromise };
