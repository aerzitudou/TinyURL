var express = require('express');
var router = express.Router();
/*
 use postman to test post
 */
router.get('/', function (req, res) {
    res.sendfile('./public/views/index.html');
});

module.exports = router;


