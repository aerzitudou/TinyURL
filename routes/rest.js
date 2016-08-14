var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var urlService = require('../services/urlService');



/*
 use postman to test post
 */
router.post('/urls', jsonParser, function (req, res) {
    //convert longUrl to shortUrl
    var shortUrl = urlService.getShortUrl(req.body.longUrl, req.app.shortToLongMap, req.app.longToShortMap);

    res.json({
        shortUrl: shortUrl,
        longUrl: req.body.longUrl
    });
});

module.exports = router;

