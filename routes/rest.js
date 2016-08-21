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

router.get("/urls/:shortUrl", function (req, res) {
    console.log("shortUrl:" + req.params.shortUrl);
    var shortUrl = req.params.shortUrl;
    var longUrl = urlService.getLongUrl(shortUrl, req.app.shortToLongMap);
    console.log("shortUrl: " + shortUrl);
    console.log("longUrl: " + longUrl);
    if (longUrl) {
        res.json({
            shortUrl: shortUrl,
            longUrl: longUrl
        })
    }
    else {
        res.status(404).send("404 not found.");
    }

});

module.exports = router;

