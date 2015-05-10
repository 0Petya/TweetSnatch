var Twit = require('twit');
var fs = require('fs');

var T = new Twit
({
	consumer_key:           'XzjjKWXFe9OxmOmyCpQklxNmR'
	, consumer_secret:      '2yIsXYliWhxxOjimIdrX01aaw8wNMvhpedRR9ehFZoCMYoJCp0'
	, access_token:         '3171126109-pyE2vLmIRiB5wLhzptiZKS3j6fgqhZxMhi600Mx'
	, access_token_secret:  'jInajNq27AUhj3cw3lXlema3PqgquXN7nhxT3G4W6hpER'
})

cleanDir('./unparsedTweets');
cleanDir('./parsedTweets');

function cleanDir(path)
{
	if (fs.existsSync(path))
	{
	    fs.readdirSync(path).forEach(function(file,index)
	    {
			var curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory())
				deleteFolderRecursive(curPath);

			else
				fs.unlinkSync(curPath);
		});
	}
}

function sample(stopTime, doneNetting)
{
	var stream = T.stream('statuses/sample');

	var i = 0;
	stream.on('tweet', gotTweet)
	setTimeout(timesUp, stopTime);

	function gotTweet(tweet)
	{
		fs.writeFileSync('./unparsedTweets/tweet' + i + '.txt', JSON.stringify(tweet))
		i++;
	}

	function timesUp()
	{
		stream.stop();
		console.log('\nCaught ' + i + ' tweets!');
		console.log('Please check the database for the tweets.')
		doneNetting(i);
	}
}

function track(stopTime, string, doneNetting)
{
	var stream = T.stream('statuses/filter', { track: [string]});

	var i = 0;
	stream.on('tweet', gotTweet)
	setTimeout(timesUp, stopTime);

	function gotTweet(tweet)
	{
		fs.writeFileSync('./unparsedTweets/tweet' + i + '.txt', JSON.stringify(tweet))
		i++;
	}

	function timesUp()
	{
		stream.stop();
		console.log('\nCaught ' + i + ' tweets!');
		console.log('Please check the database for the tweets.')
		doneNetting(i);
	}
}

function location(stopTime, coordinates, doneNetting)
{
	var stream = T.stream('statuses/filter', { locations: [coordinates]});

	var i = 0;
	stream.on('tweet', gotTweet)
	setTimeout(timesUp, stopTime);

	function gotTweet(tweet)
	{
		fs.writeFileSync('./unparsedTweets/tweet' + i + '.txt', JSON.stringify(tweet))
		i++;
	}

	function timesUp()
	{
		stream.stop();
		console.log('\nCaught ' + i + ' tweets!');
		console.log('Please check the database for the tweets.')
		doneNetting(i);
	}
}

exports.sample = sample;
exports.track = track;
exports.location = location;