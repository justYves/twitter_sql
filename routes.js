var express = require('express')
var router = express.Router()
module.exports = router
var models = require('./models')
var fs = require('fs')

//Main Page
router.get('/', function(req, res, next) {
	models.AllTweets().then(function(data){
		res.render('index', {
			tweets: data, showForm: true
		})
	})
})


//Adding Tweets 
router.post('/', function(req, res, next) {
  var name = req.body.name;
  var tweetText = req.body.text;
  //addTwee(name,tweet_content)
  
  models.AddTweet(name,tweetText).then(function(data){
    res.redirect('/users/'+name);
  })

})


//User Page showing all tweets from user
router.get('/users/:user', function(req, res, next) {
  var name = req.params.user;
  models.AllTweetsFromUser(name).then(function(data){
    res.render('index', {
      tweets: data, showForm: true
    })
  })
})






