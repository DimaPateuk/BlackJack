const path = require('path');
const fs = require('fs');
const hog = require('hog-features');
// const Image = require('jimp');
const { default: Image } = require('image-js');
const SVM = require('libsvm-js/asm');
const Kernel = require('ml-kernel');
const range = require('lodash.range');
const _ = require('lodash');
var ml = require('machine_learning');
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
    var descriptor = await getDescriptor(file);

    X_train.push(descriptor);
    var ytrain = Array(lines.length).fill(0)
    ytrain[i] = 1;
    Y_train.push([ytrain]);
  }

}


async function loadData() {
  await loadTrainingSet();
}

var u = 0;
async function getDescriptor(pathToFile) {
  var image = await Image.load(pathToFile);
  image = await image.scale({ width: 100, height: 100 });

  var descriptorFull = hog.extractHOG(image, options_hog);
  var descriptorLeft = hog.extractHOG(await (image.crop({ x: 0, y: 0, width: 50, height: 100 })), options_hog);
  var descriptorRight = hog.extractHOG(await (image.crop({ x: 50, y: 0, width: 50, height: 100 })), options_hog);

  return [
    1/sum(descriptorFull),
  ];

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
  constructor () {

  }
  train (x, y) {
    console.log(x);
    console.log(y);
    var mlp = new ml.MLP({
        'input' : x,
        'label' : y,
        'n_ins' : 1,
        'n_outs' : y.length,
        'hidden_layer_sizes' : [2,3,4,5]
    });

    mlp.set('log level',1); // 0 : nothing, 1 : info, 2 : warning.
    this.mlp = mlp;
  }
  predict () {

  }
  predictOne (descriptor) {
    var prediction = this.mlp.predict([descriptor])[0];

    var m = _.max(prediction);
    console.log(prediction);
    var resultP = _.findIndex(prediction, (v) => v === m) + 1;

    console.log(lablesMap[resultP]);
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
