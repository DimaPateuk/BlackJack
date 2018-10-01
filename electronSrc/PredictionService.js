const path = require('path');
const fs = require('fs');
const screenCaptureToJimp = require('../screenUtils/screenCaptureToJimp');
const createClassifier = require('../src/detector');

const detectorPromise = createClassifier();


function LOG (data) {
  return new Promise((res) => {
    fs.appendFile(path.resolve(__dirname, 'log'), data + '\n', res);
  });
}


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

async function saveImages (screen, cordinates) {
  const result = [];

  for (let i = 0; i < cordinates.length; i++) {
    result.push(await saveImage(screen, cordinates[i]));
  }

  return result;
}

async function saveImage (screen, cordinate) {
  const { x, y, width, height, id, pathToFile } = cordinate;
  await LOG(JSON.stringify({x, y}));

  return await screen
    .clone()
    .crop(x, y, width, height)
    .writeAsync(pathToFile);
}

async function makeResultPrediction (cordinate, screen, detector) {
  try {

    const { pathToFile } = cordinate;
    let bestResult = await detector.predict(pathToFile);
    await LOG(JSON.stringify(bestResult.difference));

    if (bestResult.difference > 1) {
      for (var i = 0; i < 100; i++) {
        cordinate.x++;
        await saveImage(screen, cordinate);
        let nextResult = await detector.predict(pathToFile);
        await LOG(JSON.stringify(nextResult.difference));
        if (nextResult.difference > bestResult.difference) {
          cordinate.x--;
          bestResult = nextResult;
        } else if (nextResult.difference < 1) {
          bestResult = nextResult;
          break;
        } else {
          continue;
        }

        cordinate.y++;
        await saveImage(screen, cordinate);
        nextResult = await detector.predict(pathToFile);
        await LOG(JSON.stringify(nextResult.difference));
        if (nextResult.difference > bestResult.difference) {
          cordinate.y--;
          bestResult = nextResult;
        } else if (nextResult.difference < 1) {
          bestResult = nextResult;
          break;
        }
      }
    }
    return bestResult;
  } catch (e) {
    await LOG(e);
    throw e;
  }
}

async function init ({ winX, winY, boxes }) {
  const screen = await screenCaptureToJimp()
  const cordinates = createCordinates({ winX, winY, boxes });
  await saveImages(screen, cordinates);
  const detector = await detectorPromise;
  const result = [];

  for (let i = 0; i < cordinates.length; i++) {
    const { pathToFile, id } = cordinates[i];
    const resultPrediction = await makeResultPrediction(cordinates[i], screen, detector);
    result.push(resultPrediction);
  }

  return result;
}

module.exports = { init: init, donePromise: detectorPromise };
