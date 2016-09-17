
/**
 * Module dependencies.
 */
var express = require('express')
   , http = require('http')
   , dbConnection = require('./api/lib/dbConnection') ()
   , morgan     = require("morgan")
   , bodyParser = require("body-parser")
   // , jwt        = require("jsonwebtoken");
   , passport   = require('passport')
   , jwt        = require('jwt-simple')
   , path = require('path')
   , methodOverride = require('method-override')
   , session = require('express-session')
   , multer = require('multer')
   , errorHandler = require('errorhandler');

var app = require("express")();

app.use(methodOverride());
app.use(session({ resave: true, saveUninitialized: true,
                  secret: 'uwot8' }));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse multipart/form-data
app.use(multer());
// view engine setup
app.engine('html', require('ejs').renderFile);

// Configuration
// app.use(express.static(path.join(__dirname, 'front')));

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

// app.use(function(req, res) {
//   res.sendFile(path.join(__dirname, 'front', 'index.html'));
// });
app.use(passport.initialize());

require('./api/config/passport')(passport);
// Routes
require('./api/routes') (app, passport);

// database connection
dbConnection.createDatabaseConnections();

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});