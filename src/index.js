const path = require('path');
const fs = require('fs');
const hog = require('hog-features');
const SVM = require('libsvm-js/asm');
const Kernel = require('ml-kernel');
const createClassifier = require('./detector');
const lablesMap = require('./detector/lablesMap.json');

(async () => {
  try {
    var { getDescriptor, classifier } = await createClassifier();
    var descriptor = await getDescriptor(path.join(__dirname, '../electronSrc/boxImages/1.png'));
    // var descriptor = await getDescriptor(path.join(__dirname, './detector/data/0_0.png'));
    // descriptor = await getDescriptor(path.join(__dirname, '../electronSrc/boxImages/2.png'));
    // classifier.predictOne(descriptor);
    // descriptor = await getDescriptor(path.join(__dirname, '../electronSrc/boxImages/3.png'));
    // // var descriptor = await getDescriptor(path.join(__dirname, './detector/data/3_0.png'));
    // classifier.predictOne(descriptor);
    console.log(lablesMap[classifier.predictOne(descriptor).key]);

  } catch (e) {
    console.log(e);
  }
})();
