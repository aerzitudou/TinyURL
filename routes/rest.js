var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
/*
 use postman to test post
 */
router.post('/urls', jsonParser, function (req, res) {
    //convert longUrl to shortUrl
    res.json({
        shortUrl: 'shortUrl',
        longUrl: 'longUrl'
    });
});

module.exports = router;

