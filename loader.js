var fs = require('fs');
var mysql = require('mysql');
var async = require('async-master');

function replaceAll(string, find, replace)
{ return string.replace(new RegExp(escapeRegExp(find), 'g'), replace); }

function escapeRegExp(string)
{ return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"); }

var host = 'localhost';
var user = 'root';
var password = '';
var database = 'twitterbot';

function loader(count) {
    
    async.series([function(callback2) {
        var connection = mysql.createConnection({
        host     : host,
        user     : user,
        password : password,
        database : database
    });
    
    connection.connect();
    connection.query('create table if not exists tweets (tweetID int not null auto_increment, twitterHandle varchar(250) null, username varchar(250) null, tweet varchar(1500) null, timeZone varchar(250) null, language varchar(250) null, followers int null, statuses int null, primary key(tweetID) ) ', function (err, result) {
            if (err) {
                connection.rollback(function () {
                    throw err;
                    connection.end();
                });
            }
            connection.commit(function (err) {
                if (err) {
                    connection.rollback(function () {
                        throw err;
                    });
                }
                connection.end(); callback2(null);
            });
        });
    }, 
    function(callback2) {
        var deleteData = mysql.createConnection({
        host     : host,
        user     : user,
        password : password,
        database : database
    });
    
    deleteData.connect();
    deleteData.beginTransaction(function (err) {
        if (err) { throw err; }
        deleteData.query('delete from tweets where username like \'%\' ', function (err, result) {
            if (err) {
                deleteData.rollback(function () {
                    throw err;
                    deleteData.end();
                });
            }
            deleteData.commit(function (err) {
                if (err) {
                    deleteData.rollback(function () {
                        throw err;
                    });
                }
                deleteData.end();callback2(null);
            });
        });
    }); 
    }, function(callback2) {
        var connection = mysql.createConnection({
        host     : host,
        user     : user,
        password : password,
        database : database
    });
    
    connection.connect();
    connection.beginTransaction(function (err) {
        if (err) { throw err; }
        
        var arr = [];
        
        for (var i = 0; i < count; i++) {
            arr.push(i);
        }
        
        async.each(arr, function (i, callback) {
            var filePath = './unparsedTweets/tweet' + i + '.txt';
            var unParsed = fs.readFileSync(filePath);
            
            var parsed = replaceAll(unParsed.toString(), ',', '\n');
            var newFilePath = './parsedTweets/tweet' + i + '.txt';
            fs.writeFileSync(newFilePath, parsed);
            var test = '{"text": "text of tweet", "user": {"name": "name of user"} }';
            var jason = JSON.parse(unParsed);
            var text = parseEncode(jason['text']);
            var twitterHandle = jason['user']['screen_name'];
            var username = parseEncode(jason['user']['name']);
            var timeZone = jason['user']['time_zone'];
            var language = jason['user']['lang'];
            var followerCount = jason['user']['followers_count'];
            var statusCount = jason['user']['statuses_count'];

            var queryString = 'INSERT INTO tweets (twitterHandle, username, tweet, timeZone, language, followers, statuses) values("' + twitterHandle + '", "' + username + '", "' + text + '", "' + timeZone + '", "' + language + '", "' + followerCount + '", "' + statusCount + '")';
            connection.query(queryString, function (err, result) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        }, function (err) {
            if (err) {
                connection.rollback();
                console.log(err);
                return;
            }
            
            connection.commit();
            connection.end(); callback2(null);
        });
    
    }); 
    }]);
    
    
    
}

function parseEncode(s) {
    s = replaceAll(s, '"', '');
    return s;
}

module.exports = loader;