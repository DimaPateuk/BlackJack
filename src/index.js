const path = require('path');
const fs = require('fs');
const hog = require('hog-features');
const { default: Image } = require('image-js');
const SVM = require('libsvm-js/asm');
const Kernel = require('ml-kernel');
const createClassifier = require('./detector');

(async () => {
  var { getDescriptor, classifier } = await createClassifier();
  var descriptor = await getDescriptor(path.join(__dirname, 'detector/data/2_0.png'));
  // var descriptor = await getDescriptor(path.join(__dirname, 'test.jpg'));
  var t = classifier.predictOne(descriptor);
 console.log(11111111, t);
})();
