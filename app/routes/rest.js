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
    //as long as it is db related operation, it is IO. So, use function for db operation
    var longUrl = req.body.longUrl;
    var shortUrl = urlService.getShortUrl(longUrl, function (url) {  //this is a callback function. url is a long-short url pair.
        res.json(url);
    });
});

router.get("/urls/:shortUrl", function (req, res) {
    var shortUrl = req.params.shortUrl;
    var longUrl = urlService.getLongUrl(shortUrl, function (url) {
        if (url) {
            res.json(url)
        } else {
            res.status(404).send("No page found");
        }
    });

});

module.exports = router;

