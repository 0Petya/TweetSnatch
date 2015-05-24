var net = require('./net.js');
var loader = require('./loader.js');
var TweetSnatch = require('prompt');

process.stdout.write('\u001B[2J\u001B[0;0f');
TweetSnatch.start();
console.log('Please specify the bounding box of coordinates of where you would like to look, and for how many seconds would you like to capture tweets.');
TweetSnatch.get(['coordinates', 'time'], locationRequestRecieved);

function locationRequestRecieved(err, locationResult)
{
	time = locationResult.time * 1000;
	net.location(time, locationResult.coordinates, loader);
}