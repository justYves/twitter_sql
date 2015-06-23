var express = require('express')
var router = express.Router()
module.exports = router
var models = require('./models')
var fs = require('fs')

router.get('/', function(req, res, next) {
  // res.json(tweetBank.list())
  // res.render('index', {
  //   //tweets: tweetBank.list()
  //   users: models.User
  // })
	models.AllTweets().then(function(data){
		res.render('index', {
			tweets: data
		})
	})
})

router.post('/', function(req, res, next) {
  tweetBank.add(req.body.name, req.body.tweet)
  res.status(201).end()
})

router.get('/users/:user', function(req, res, next) {
  var tweets = tweetBank.find({ name: req.params.user })
  res.render('index', { tweets: tweets })

})

// example without static file server
// router.get('/style.css', function(req, res) {
//   fs.readFile('./public/style.css', function(err, contentBuffer) {
//     var css = contentBuffer.toString()
//     res.header('Content-Type', 'text/css')
//     res.send(css)
//   })
// })




