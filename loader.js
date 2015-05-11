var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

function replaceAll(string, find, replace)
{ return string.replace(new RegExp(escapeRegExp(find), 'g'), replace); }

function escapeRegExp(string)
{ return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"); }

function parseEncode(s)
{ return replaceAll(s, '"', ''); }

function createTable()
{ db.run('create table if not exists tweets (twitterHandle varchar(250) null, username varchar(250) null, tweet varchar(1500) null, timeZone varchar(250) null, language varchar(250) null, followers int null, statuses int null)'); }

function parseTweets(err, row)
{
    var parsed = 'User Twitter handle : ' + row.twitterHandle + '\n' + 'User name : ' + row.username + '\n' + 'Tweet : ' + row.tweet + '\n' + 'Time zone : ' + row.timeZone + '\n' + 'Language : ' + row.language + '\n' + 'User follower count : ' + row.followers + '\n' + 'User status count : ' + row.statuses;

    var newFilePath = './parsedTweets/tweets' + row.tweetID + '.txt';
    fs.writeFileSync(newFilePath, parsed);
}



var db = new sqlite3.Database(':memory:');
db.serialize(createTable);

function loader(count)
{
    for (var i = 0; i < count; i++)
    {
        var filePath = './unparsedTweets/tweet' + i + '.txt';
        var unParsed = fs.readFileSync(filePath);

        var jason = JSON.parse(unParsed);
        var text = parseEncode(jason['text']);
        var twitterHandle = jason['user']['screen_name'];
        var username = parseEncode(jason['user']['name']);
        var timeZone = jason['user']['time_zone'];
        var language = jason['user']['lang'];
        var followerCount = jason['user']['followers_count'];
        var statusCount = jason['user']['statuses_count'];

        var stmt = db.prepare('INSERT INTO tweets (twitterHandle, username, tweet, timeZone, language, followers, statuses) values("' + twitterHandle + '", "' + username + '", "' + text + '", "' + timeZone + '", "' + language + '", "' + followerCount + '", "' + statusCount + '")');
        stmt.run();
        stmt.finalize();

        if (i == count - 1)
        {
            db.each("SELECT rowid as tweetID, twitterHandle, username, tweet, timeZone, language, followers, statuses FROM tweets", parseTweets);
            db.close();
        }
    }
}

module.exports = loader;