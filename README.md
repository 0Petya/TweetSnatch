This GitHub page is dedicated for group work. It is not
intended for public consumption.
__________

TwitterBot
__________

By: Peter Tran, Huong Nguyen, and Hiro Harada

Before you can run the program, you must install Node.js and MySQL.

You can install Node.js here:
https://nodejs.org/

You can install MySQL here:
https://www.mysql.com/



Before running the program, you have to create a new database
called "twitterbot". The database must be able to hold special
characters. Below is SQL that will generate that database.

You must have a MySQL account on the machine with the username 
"root", and a null password.

````
CREATE DATABASE twitterbot
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;
````

To run the program, you can just run with 

````
$ node twitterBot.js
````