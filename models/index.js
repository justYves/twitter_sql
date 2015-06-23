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


var allTweets = function(){
	return Tweet.all({include: [User]}).then(function(tweet){
		return tweet
	})
}

var allTweetsFromUser = function(name){
  return Tweet.all({include: [{
    model : User,
    where : {name: {$like: name}}
  }]}).then(function(tweet){
    return tweet
  })
}

var addTweet = function(name, text){
  //find user ID
  return User.findOne({where:{name: {$like:name}}}) // query Tweets that return tweets from a user
  .then(function(userRow){
    return userRow.id;
  })
  .then(function(data){
    return Tweet.create({UserId: Number(data), tweet: text}) //writes a new tweet
  })
  .catch(function(err){
    User.create({name: name}).then(function(name){
      User.findOne({where:{name: {$like:name}}}).then(function(data){
        return Tweet.create({UserId: Number(data), tweet: text});
      });
    })
  })
}


module.exports = {
  User: User,
  Tweet: Tweet,
  AllTweets: allTweets,
  AllTweetsFromUser : allTweetsFromUser,
  AddTweet: addTweet
};



