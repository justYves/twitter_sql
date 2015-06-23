// pull in the Sequelize library
var Sequelize = require('sequelize');
// create an instance of a database connection
// which abstractly represents our app's mysql database
var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
    dialect: "mysql",
    port:    3306,
});

// open the connection to our database
twitterjsDB
  .authenticate()
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  })
  .then(function() {
    console.log('Connection has been established successfully.');
  });

// set up tables
var Tweet = require('./tweet')(twitterjsDB);
var User = require('./user')(twitterjsDB);

// adds a UserId foreign key to the `Tweet` table
User.hasMany(Tweet);
Tweet.belongsTo(User);

// var findAllTweets = function(){
// 	return User.findAll().then(function(result){
// 		result.getTweets().then(function(tweets){
// 			return tweets
// 		})
// 	})
// }

//var UserTest = require('../models').User;
var UserTest = function () {
	return User.findById(4).then(function(user) {
        return JSON.stringify(user);
	});
}

var allTweets = function(){
	return Tweet.all().then(function(tweet){
		return tweet
	})
}



module.exports = {
    User: User,
    Tweet: Tweet,
    AllTweets: allTweets,
};



