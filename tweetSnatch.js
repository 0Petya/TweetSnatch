var net = require('./net.js');
var loader = require('./loader.js');
var TweetSnatch = require('prompt');

process.stdout.write('\u001B[2J\u001B[0;0f');
TweetSnatch.start();
console.log('Please select whether you want to make a sample, track, or location request.');
TweetSnatch.get(['request'], requestRecieved);

function requestRecieved(err, result)
{
	if (result.request == 'sample')
		sampleRequest();
	else if (result.request == 'track')
		trackRequest();
	else if (result.request == 'location')
		locationRequest();
	else
		console.log('Invalid request, check your spelling.');
}

function sampleRequest()
{
	process.stdout.write('\u001B[2J\u001B[0;0f');
	TweetSnatch.start();
	console.log('Please specify for how many seconds would you like to capture tweets.');
	TweetSnatch.get(['time'], sampleRequestRecieved);

	function sampleRequestRecieved(err, sampleResult)
	{
		time = sampleResult.time * 1000;
		net.sample(time, loader);
	}
}

function trackRequest()
{
	process.stdout.write('\u001B[2J\u001B[0;0f');
	TweetSnatch.start();
	console.log('Please specify what string you are looking for, and for how many seconds would you like to capture tweets.');
	TweetSnatch.get(['string', 'time'], trackRequestRecieved);

	function trackRequestRecieved(err, trackResult)
	{
		time = trackResult.time * 1000;
		net.track(time, trackResult.string, loader);
	}
}

function locationRequest()
{
	process.stdout.write('\u001B[2J\u001B[0;0f');
	TweetSnatch.start();
	console.log('Please specify the bounding box of coordinates of where you would like to look, and for how many seconds would you like to capture tweets.');
	TweetSnatch.get(['coordinates', 'time'], locationRequestRecieved);

	function locationRequestRecieved(err, locationResult)
	{
		time = locationResult.time * 1000;
		net.location(time, locationResult.coordinates, loader);
	}
}