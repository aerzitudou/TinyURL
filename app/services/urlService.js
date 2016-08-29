var UrlModel = require('../models/urlmodel');

var getLongUrl = function (shortUrl, callback) {
    UrlModel.findOne({shortUrl: shortUrl}, function (err, url) {
        callback(url);
    });
};

var getShortUrl = function (longUrl, callback) {
    if (longUrl.indexOf('http') === -1) {
        longUrl = 'http://' + longUrl.toString();
    }

    UrlModel.findOne({longUrl: longUrl}, function (err, url) {
        if (url) {
            callback(url);//怎么让call getshorturl 的function 拿到url呢: By calling callback and passing in the url
        } else {
            generateShortUrl(function (shortUrl) {

                var url = new UrlModel({shortUrl: shortUrl, longUrl: longUrl});
                url.save(); //把url发给数据库让它存起来
                callback(url);
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
        callback(convertTo64(urls.length));
    });
}

var convertTo64 = function (num) {
    var result = '';
    if (num === 0) {
        return encode[0];
    }
    while (num != 0) {
        result = encode[num % 64] + result;
        //Javascript doesn't have int type. Result has to be floored to get the division.
        num = Math.floor(num / 64);
    }
    return result;
}

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
}