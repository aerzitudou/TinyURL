// var http = require('http');
// var fs = require('fs');
var express = require('express');
var app = express();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

//The "." notation refers to the working directory itself and the ".." notation refers to the working directory's parent directory.
var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');
var userAccessRouter = require('./routes/userAccess');
//connect to mongodb
var mongoose = require('mongoose');
var useragent = require('express-useragent');


mongoose.connect('mongodb://user:user@ds013946.mlab.com:13946/tinyurl');
/*
 http://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
 explains middleware mechanism about app.use
 */
// user schema/model
var User = require('./models/user.js');

app.use(passport.initialize());
app.use(passport.session());
//configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use('/user', userAccessRouter);
app.use('/public', express.static(__dirname + '/public'));
app.use(useragent.express()); //
app.use('/rest', restRouter);
app.use('/', indexRouter);
app.use('/:shortUrl', redirectRouter); //why semicolon before shorturl here: variable

//above are middlewares sit to find matched http request for processing it further


app.listen(3000);


//get ride of memory map:
// app.shortToLongMap = {};
// app.longToShortMap = {};


//1st version: create a server without express
// http.createServer(function (req, res) {
// if (req.url = '/') {
//     console.log("inside url /");
//     res.writeHead(200, {"Content-Type": "text-html"});
//     var html = fs.readFileSync(__dirname + '/index.html');
//     res.end("<html><head></head><body><h1>in end</h1></body></html>")
//     };
//     if(req.url = '/test') {
//         res.writeHead(200, {"Content-Type": "application/json"});
//         var obj = {
//             name: 'Brenda',
//             age: 27
//         }
//
//         res.end(JSON.stringify(obj))
//     }
//
// }).listen(3000);


//2nd version: create a server with express, send a get request with plain text/json
// app.get('/', function(req, res) {
//     res.send("First Express!");
// });

// app.get('/', function(req, res) {
//     res.json({
//         name: 'Br',
//         msg: 'express json',
//         age: 27
//     })
// });

//this is the server acting as the entry point for the tinyUrl
