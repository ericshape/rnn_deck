var express = require('express');
var path = require('path');
var index = require('./routes/index');
var tweets = require('./routes/tweets');
var app = express();

// call the packages we need
var bodyParser = require('body-parser');
var morgan = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// // look for view html in the views directory
// app.set('views', path.join(__dirname, 'views'));
// // use ejs to render
// app.set('view engine', 'ejs');
//
// // use res.render to load up an ejs view file
// // index page
// app.get('/', function (req, res) {
//     res.render('index');
// });

// setup routes
// app.use('/', index);
app.use('/tweets', tweets);


module.exports = app;

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Listening on ' + port);
});
