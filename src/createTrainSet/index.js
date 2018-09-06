const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');


function appenedAsync (path, data) {
  return new Promise((res) => {
    fs.appendFile(path, data, res);
  });
}

(async function () {
  const allCards = await Jimp.read(path.resolve(__dirname, '../all_cards.png'));

  fs.unlinkSync(path.resolve(__dirname, '../detector/labels_test.csv'));
  fs.unlinkSync(path.resolve(__dirname, '../detector/labels_train.csv'));

  try {
    let count = 0;
    for (var i = 0; i < 6; i++) {
      for (var j = 8; j >= 0; j--) {
        count++;
        if (count <= 2) continue;
        let numberOfVariant = 0;
        for (var x = -2; x < 3; x++)
        for (var k = -2; k < 3; k++) {
          const fileName = `${count - 2}_${numberOfVariant++}.png`;
          await allCards.clone()
            .crop(j * 83 + (3 + x), i * 115 + (5 + k), 18, 45)
            .write(path.resolve(__dirname, '../detector/data', fileName));
            await appenedAsync(path.resolve(__dirname, '../detector/labels_test.csv'), `${fileName};${count - 2}\n`);
            await appenedAsync(path.resolve(__dirname, '../detector/labels_train.csv'), `${fileName};${count - 2}\n`);

        }
      }
    }
  } catch (e) {
    console.log(e);
  }
})()
