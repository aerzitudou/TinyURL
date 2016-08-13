// var http = require('http');
// var fs = require('fs');
var express = require('express');
var app = express();

var apiRouter = require('./routes/api');
/*
 http://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
 explains middleware mechanism about app.use
 */
app.use('/api', apiRouter);

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

app.listen(3000);


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

