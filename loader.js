var fs = require('fs');

function replaceAll(string, find, replace)
{ return string.replace(new RegExp(escapeRegExp(find), 'g'), replace); }

function escapeRegExp(string)
{ return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"); }

function parseEncode(s)
{ return (replaceAll(s, '"', '')) }

function loader(count)
{
    for (var i = 0; i < count; i++)
    {
        var filePath = './unparsedTweets/tweet' + i + '.txt';
        var unParsed = fs.readFileSync(filePath);

        var parsed = replaceAll(unParsed.toString(), ',', '\n');

        var newFilePath = './parsedTweets/tweet' + i + '.txt';
        fs.writeFileSync(newFilePath, parsed);
    }
}

module.exports = loader;