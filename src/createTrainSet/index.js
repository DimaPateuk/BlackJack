const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');


function appenedAsync (path, data) {
  return new Promise((res) => {
    fs.appendFile(path, data, res);
  });
}

async function unlink (path) {
  try {
    fs.unlinkSync(path);
  } catch (e) {
    console.log('incorect unlink');
  }
}


var cardIndex = [
  'A',2,3,4,5,6,7,8,9,10,'J','D','K',
];

var cardSuit = [
  'spade',
  'heart',
  'club',
  'diamond',
];

var numbrs = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

(async function () {
  const lablesMap = {};
  let count = 0;
  const allCards = await Jimp.read(path.resolve(__dirname, '../all_cards.png'));
  const allNumbers = await Jimp.read(path.resolve(__dirname, '../all_numbers.png'));
  const nothing1 = await Jimp.read(path.resolve(__dirname, '../nothing1.png'));
  const nothing2 = await Jimp.read(path.resolve(__dirname, '../nothing2.png'));
  const nothing3 = await Jimp.read(path.resolve(__dirname, '../nothing3.png'));
  const nothing4 = await Jimp.read(path.resolve(__dirname, '../nothing4.png'));
  let skipFirstTwo = 0;
  let countCardWithSameSuit = 0;


  await unlink(path.resolve(__dirname, '../detector/labels_test.csv'));
  await unlink(path.resolve(__dirname, '../detector/labels_train.csv'));
  await unlink(path.resolve(__dirname, '../detector/lablesMap.json'));

  const cardSuitLables = cardSuit.slice(0);
  let cardIndexLables = cardIndex.slice(0);

  let currentCardIndex;
  let currentCardSuit = cardSuitLables.shift();

  try {
    // console.log('start making CARDS set');
    // for (var i = 0; i < 6; i++) {
    //   for (var j = 8; j >= 0; j--) {
    //     if (skipFirstTwo < 2) {
    //       skipFirstTwo++;
    //       continue;
    //     }
    //     if (countCardWithSameSuit === 13) {
    //       countCardWithSameSuit = 1;
    //       cardIndexLables = cardIndex.slice(0);
    //       currentCardIndex = cardIndexLables.shift();
    //       currentCardSuit = cardSuitLables.shift();
    //     } else {
    //       currentCardIndex = cardIndexLables.shift();
    //       countCardWithSameSuit++;
    //     }
    //
    //     let numberOfVariant = 0;
    //
    //     // for (var x = -2; x < 3; x++)
    //     // for (var k = -2; k < 3; k++) {
    //     for (var x = 0; x < 1; x++)
    //     for (var k = 0; k < 1; k++) {
    //       const fileName = `${count}_${numberOfVariant++}.png`;
    //
    //       lablesMap[count] = `${currentCardSuit} ${currentCardIndex}`;
    //       await allCards.clone()
    //         .crop(j * 83 + (3 + x), i * 115 + (5 + k), 18, 45)
    //         .dither565()
    //         .write(path.resolve(__dirname, '../detector/data', fileName));
    //         await appenedAsync(path.resolve(__dirname, '../detector/labels_test.csv'), `${fileName};${count}\n`);
    //         await appenedAsync(path.resolve(__dirname, '../detector/labels_train.csv'), `${fileName};${count}\n`);
    //
    //     }
    //     count++;
    //
    //   }
    // }

    console.log('start making NUMBERS set');

    let numbrsLables = numbrs.slice(0);
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 5; j++) {
        const numberLable = numbrsLables.shift();
        let numberOfVariant = 0;
        for (var x = -3; x < 4; x++)
        for (var k = -3; k < 4; k++) {
        // for (var x = 0; x < 1; x++)
        // for (var k = 0; k < 1; k++) {
          const fileName = `${count}_${numberOfVariant++}.png`;
          lablesMap[count] = numberLable;


          var im = await allNumbers.clone().crop(x + 55 + j * 98, k + 30 + i * 140, 100, 150);



          await im.dither565().write(path.resolve(__dirname, '../detector/data', fileName));
          await appenedAsync(path.resolve(__dirname, '../detector/labels_test.csv'), `${fileName};${count}\n`);

          await appenedAsync(path.resolve(__dirname, '../detector/labels_train.csv'), `${fileName};${count}\n`);
          count++;
         }
      }
    }

    async function calcNothingSet (img) {
      const sizeX = 30;
      const sizeY = 30;
      const iMax = img.bitmap.height / sizeY;
      const jMax = img.bitmap.width / sizeX;

      for (var i = 0; i + sizeX < img.bitmap.height; i += 20)
      for (var j = 0; j + sizeY < img.bitmap.width; j += 20) {
        const fileName = `${count}_nothing.png`;
        lablesMap[count] = 'nothing';

        await img.clone()
          .crop(j, i, sizeX, sizeY)
          .write(path.resolve(__dirname, '../detector/data', fileName));
        await appenedAsync(path.resolve(__dirname, '../detector/labels_test.csv'), `${fileName};${count}\n`);
        await appenedAsync(path.resolve(__dirname, '../detector/labels_train.csv'), `${fileName};${count}\n`);
        count++;
      }
    }
    //
    // console.log('start making NOTHING set');
    // await calcNothingSet(nothing1);
    // await calcNothingSet(nothing2);
    // await calcNothingSet(nothing3);
    // await calcNothingSet(nothing4);

  } catch (e) {
    console.log(e);
  }

  await appenedAsync(path.resolve(__dirname, '../detector/lablesMap.json'), JSON.stringify(lablesMap));

})()
