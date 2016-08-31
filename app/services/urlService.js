var UrlModel = require('../models/urlmodel');
var redis = require('redis'); //拿到redis的包

var host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1';
var port = process.env.REDIS_PORT_6379_TCP_PORT || '6379';


var redisClient = redis.createClient(port, host); // 链接redis: 先传port, 再传host

var getLongUrl = function (shortUrl, callback) {
    redisClient.get(shortUrl, function (err, longUrl) {
        if (longUrl) {
            callback({
                longUrl: longUrl,
                shortUrl: shortUrl
            });
        } else {
            UrlModel.findOne({shortUrl: shortUrl}, function (err, url) {
                callback(url);
            });
        }
    });
};


var getShortUrl = function (longUrl, callback) {
    if (longUrl.indexOf('http') === -1) {
        longUrl = 'http://' + longUrl.toString();
    }

    redisClient.get(longUrl, function (err, shortUrl) {
        if (shortUrl) {
            callback({
                longUrl: longUrl,
                shortUrl: shortUrl
            });
        } else {
            UrlModel.findOne({longUrl: longUrl}, function (err, url) {
                if (url) {
                    callback(url);
                } else {
                    generateShortUrl(function (shortUrl) {
                        var url = new UrlModel({shortUrl: shortUrl, longUrl: longUrl});
                        url.save();
                        redisClient.set(shortUrl, longUrl);
                        redisClient.set(longUrl, shortUrl);
                        callback(url);
                    });
                }
            });
        }

    });
}


var generateEncode = function (charA, charZ) {
    var ary = [];
    var i = charA.charCodeAt(0);
    var j = charZ.charCodeAt(0);
    for (; i <= j; i++) {
        ary.push(String.fromCharCode(i));
    }
    return ary;
}


var encode = [];
//generate encode
//have an encode array that contains [0-9] [a-z] [A-Z]
encode = encode.concat(generateEncode('0', '9'));
encode = encode.concat(generateEncode('a', 'z'));
encode = encode.concat(generateEncode('A', 'Z'));


var generateShortUrl = function (callback) {
    UrlModel.find({}, function (err, urls) {  //找到所有的records, 第一个参数值任意值都符合条件
        callback(convertTo62(urls.length));
    });
}

var convertTo62 = function (num) {
    var result = '';
    if (num === 0) {
        return encode[0];
    }
    while (num != 0) {
        result = encode[num % 62] + result;
        //Javascript doesn't have int type. Result has to be floored to get the division.
        num = Math.floor(num / 62);
    }
    return result;
}

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
}