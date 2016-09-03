var express = require('express');
var router = express.Router();

var urlService = require('../services/urlService');

var statsService = require('../services/statsService');

//var bodyParser = require('body-parser');
//var jsonParser = bodyParser.json();

// GET * for anything
// no need to parse json, get rid of jsonParser here

router.get('*', function (req, res) {
    //redirect from shortUrl to longUrl
    var shortUrl = req.originalUrl.slice(1); // originalUrl = "/XXX" instead of "XXX", XXX is what we need
    var longUrl = urlService.getLongUrl(shortUrl, function (url) {
        if (url) {
            res.redirect(url.longUrl); //entry point for short url redirecting to long
            statsService.logRequest(shortUrl, req); //log format from req could be changed, since req contain all info, sending req as whole to make sure interface stays unchanged
        } else {
            res.sendFile('./public/views/404.html');
        }

    });

});

module.exports = router;