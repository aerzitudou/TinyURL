var express = require('express');
var router = express.Router();
/*
 use postman to test post
 */
router.get('/', function (req, res) {
    res.sendFile('index.html', {'root': '/Users/brendaZh/QuanZhan/public/views'})
});

module.exports = router;

