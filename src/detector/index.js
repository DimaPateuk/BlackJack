const path = require('path');
const fs = require('fs');
const hog = require('hog-features');
// const Image = require('jimp');
const { default: Image } = require('image-js');
const SVM = require('libsvm-js/asm');
const Kernel = require('ml-kernel');
const range = require('lodash.range');
const _ = require('lodash');

const lablesMap = require('./lablesMap.json');

let options = {
  type: SVM.SVM_TYPES.NU_SVC,
  kernel: SVM.KERNEL_TYPES.PRECOMPUTED,
  degree: 3,
  nu: 0.1,
  shrinking: false
};

let options_hog = {
  cellSize: 4,
  blockSize: 2,
  blockStride: 1,
  bins: 6,
  norm: 'L2'
};

let X_train = [];
let Y_train = [];
let X_test = [];
let Y_test = [];
let K_train;
let K_test;

let kernel;

async function loadTrainingSet() {
  var lines = fs
    .readFileSync(path.join(__dirname, 'labels_train.csv'))
    .toString()
    .split('\n');
  for (var i = 0; i < lines.length; i++) {
    var elements = lines[i].split(';');
    if (elements.length < 2) continue;
    var file = path.join(__dirname, '/data/' + elements[0]);
    // in the variable X, we will store the HOG of the pictures
    // var image = await Image.load(file);
    // image = await image.scale({ width: 100, height: 100 });
    // var descriptor = hog.extractHOG(image, options_hog);
    var descriptor = await getDescriptor(file);

    X_train.push(descriptor);
    Y_train.push(elements[1]);
  }
  //
  // kernel = new Kernel('polynomial', { degree: 3, scale: 1 / X_train.length });
  // K_train = kernel.compute(X_train).addColumn(0, range(1, X_train.length + 1));
}

async function loadTestSet() {
  var lines = fs
    .readFileSync(path.join(__dirname, 'labels_test.csv'))
    .toString()
    .split('\n');
  for (var i = 0; i < lines.length; i++) {
    var elements = lines[i].split(';');
    if (elements.length < 2) continue;
    var file = path.join(__dirname, '/data/' + elements[0]);
    // in the variable X, we will store the HOG of the pictures
    // var image = await Image.load(file);
    // image = await image.scale({ width: 100, height: 100 });
    // var descriptor = hog.extractHOG(image, options_hog);
    var descriptor = await getDescriptor(file);
    X_test.push(descriptor);
    Y_test.push(elements[1]);
  }
  // K_test = kernel
  //   .compute(X_test, X_train)
  //   .addColumn(0, range(1, X_test.length + 1));
}

async function loadData() {
  await loadTrainingSet();
  await loadTestSet();
}

async function test(classifier) {
  const result = classifier.predict(K_test);
  const testSetLength = X_test.length;
  const predictionError = error(result, Y_test);
  const accuracy =
    (parseFloat(testSetLength) - parseFloat(predictionError)) /
    parseFloat(testSetLength) *
    100;
  console.log(`Test Set Size = ${testSetLength} and accuracy ${accuracy}%`);

}

function error(predicted, expected) {
  let misclassifications = 0;
  for (var index = 0; index < predicted.length; index++) {
    console.log(
      `${index} => expected : ${expected[index]} and predicted : ${
        predicted[index]
      }`
    );
    if (predicted[index] != expected[index]) {
      console.log(predicted[index], expected[index])
      misclassifications++;
    }
  }
  return misclassifications;
}
var u = 0;
async function getDescriptor(pathToFile) {
  // fs.writeFile(path.resolve(__dirname, 'serializedBoxes.json'), JSON.stringify(arg));
  var image = await Image.load(pathToFile);
  image = await image.scale({ width: 100, height: 100 });

  var descriptorFull = hog.extractHOG(image, options_hog);
  var descriptorLeft = hog.extractHOG(await (image.crop({ x: 0, y: 0, width: 50, height: 100 })), options_hog);
  var descriptorRight = hog.extractHOG(await (image.crop({ x: 50, y: 0, width: 50, height: 100 })), options_hog);
  //
  // await image.crop({ x: 0, y: 0, width: 50, height: 100 }).save(path.resolve(__dirname, 'data/'+u+'000.png'));
  // await image.crop({ x: 50, y: 0, width: 50, height: 100 }).save(path.resolve(__dirname, 'data/'+u+'001.png'));
  // u++;
  return sum(descriptorFull)
    + sum(descriptorLeft) * 2
    + sum(descriptorRight) * 2
  ;

}

function sum (arr) {
  var sum = 0;
  for (var j = 0; j < arr.length; j++) {
    sum += arr[j];
  }

  return sum;
}

function getVal (item) {
  return item.difference;
}

function closest (num, arr) {
    var curr = arr[0];
    var diff = Math.abs (num - getVal(curr));
    for (var val = 0; val < arr.length; val++) {
        var newdiff = Math.abs (num - getVal(arr[val]));
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
        }
    }
    return curr;
}



class Classifier {
  train (x, y) {
    this.data = {};
    for (var i = 0; i < y.length; i++) {

      if (!this.data[y[i]]) {
        this.data[y[i]] = x[i];
      } else {
        this.data[y[i]] = x[i];
      }

    }

    for(var key in this.data) {
      console.log(lablesMap[key], this.data[key]);
    }
  }
  predict () {

  }
  predictOne (descriptor) {
    var result = [];
    for(var key in this.data) {
      result.push({
        key,
        lable: lablesMap[key],
        difference: Math.abs (this.data[key] - descriptor),
      });
    }

    console.log(_.minBy(result, item => item.difference));
    return _.minBy(result, item => item.difference);
  }
}



module.exports = async function createClassifier() {

  await loadData();
  classifier = new Classifier();
  classifier.train(X_train, Y_train);

  return {
    getDescriptor: getDescriptor,
    classifier: classifier,
    predict: async (pathToFile) => {
      var descriptor = await getDescriptor(pathToFile);
      return classifier.predictOne(descriptor);
    }
  };
};
