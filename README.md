TweetSnatch
===========

TweetSnatch is an ongoing project, that is used for capturing and storing tweets in real time.

To use, you have to run the main .js file with Node.js:

''''
$ node tweetSnatch.js
''''

Once it runs, it will prompt you for coordinates and an amount of time you would like to capture for. The coordinates are given to create a boundary box, so you need to give southwest coordinates first, and then the northwest coordinates, as in below for New York City. The time specified is in seconds.

''''
Please specify the bounding box of coordinates of where you would like to look,
and for how many seconds would you like to capture tweets.
prompt: coordinates:  -74.2589, 40.4774, -73.7004, 40.9176
prompt: time:  5

Caught 3 tweets! Missed 0 tweets.
Please check the parsedTweets folder for the tweets.
''''

Afterwards, the tweets will be parsed and stored inside the parsedTweets folder.

Currently, this uses sqlite as a database to store the tweets. In the future, I plan on integrating this with Google Maps so that users my visually specify the bounding box, as well as being able to perform queries on the database.



This was an offshoot from my TwitterBot group project:
https://github.com/Oh-Petya/CSC314TwitterProject

Functionality was reduced. Now it is used specifically for geolocated tweets witin specified boundaries.