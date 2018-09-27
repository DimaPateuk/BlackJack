const path = require('path');
const fs = require('fs');
const hog = require('hog-features');
const { default: Image } = require('image-js');
const SVM = require('libsvm-js/asm');
const Kernel = require('ml-kernel');
const createClassifier = require('./detector');
const lablesMap = require('./detector/lablesMap.json');

(async () => {
  try {
    var { getDescriptor, classifier } = await createClassifier();
    var descriptor = await getDescriptor(path.join(__dirname, '../electronSrc/boxImages/3.png'));
    var t = classifier.predictOne(descriptor);
    console.log(11111111, lablesMap[t]);

  } catch (e) {
    console.log(e);
  }
})();
