var express = require('express')
var logger = require('morgan')
var swig = require('swig')
var bodyParser = require('body-parser')
var app = express()
module.exports = app

swig.setDefaults({cache: false});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './views');

// console.log(logger.toString())
app.use(logger('dev'))

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: false }))


app.use(require('./routes'))



app.listen(3000)