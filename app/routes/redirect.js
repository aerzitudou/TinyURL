var express = require('express');
var router = express.Router();

var urlService = require('../services/urlService')

//var bodyParser = require('body-parser');
//var jsonParser = bodyParser.json();

// GET * for anything
// no need to parse json, get rid of jsonParser here

router.get('*', function (req, res) {
    //redirect from shortUrl to longUrl
    var shortUrl = req.originalUrl.slice(1); // originalUrl = "/XXX" instead of "XXX", XXX is what we need
    var longUrl = urlService.getLongUrl(shortUrl, function (url) {
        if (url) {
            res.redirect(url.longUrl);
        } else {
            res.sendFile('./public/views/404.html');
        }

    });

});

module.exports = router;