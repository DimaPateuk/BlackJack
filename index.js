'use strict';
var pixel = require('pixel');
var brain = require('brain');
var net = new brain.NeuralNetwork({
	hiddenLayers: [100]
});

const callback = (images) => {
	let data = images[0].data;
	let result = [];
	for (let i = 0; i < data.length; i++) {
		result.push(data[i]);
	}
	return result;
}
const onePromise = pixel.parse('img/one.png').then(callback);
const twoPromise = pixel.parse('img/two.png').then(callback);

Promise.all([onePromise, twoPromise])
	.then((result) => {
		let one = result[0];
		let two = result[1];
		net.train(
			[
				{input: one, output: {one:   1}},
				{input: two, output: {two:   1}},
			],
			{
				errorThresh: 0.00001,  // error threshold to reach before completion
				iterations: 20000,   // maximum training iterations 
				log: true,           // console.log() progress periodically 
				logPeriod: 10,       // number of iterations between logging 
				learningRate: 0.1    // learning rate 
			}
		);
		console.log('after');
		console.log(net.run(one));
	})
	.catch((e) => console.log(e)) ;














// console.log(net.run([1,0,0,0,0]));
// console.log(net.run([1,2,0,0,0]));
// console.log(net.toJSON());