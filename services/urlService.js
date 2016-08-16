var getLongUrl = function (shortUrl, shortToLongMap) {
    var longUrl = shortToLongMap[shortUrl];
    console.log(longUrl);
    return longUrl;
};

var getShortUrl = function (longUrl, shortToLongMap, longToShortMap) {
    if (longUrl.indexOf('http') === -1) {
        longUrl = 'http://' + longUrl.toString();
    }

    if (longToShortMap[longUrl] != null) {
        return longToShortMap[longUrl];
    }

    else {
        var shortUrl = generateShortUrl(longToShortMap);
        longToShortMap[longUrl] = shortUrl;
        shortToLongMap[shortUrl] = longUrl;
        return shortUrl;
    }

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
encode.concat(generateEncode('0', '9'));
encode.concat(generateEncode('a', 'z'));
encode.concat(generateEncode('A', 'Z'));


var generateShortUrl = function (longToShortMap) {
    var num = Object.keys(longToShortMap).length;
    var shortUrl = convertTo64(num);
    return shortUrl;
}

var convertTo64 = function (num) {
    var result = '';
    if (num === 0) {
        return encode[0];
    }
    while (num != 0) {
        result = encode[num % 64] + result; //TODO: encode doesn't have value
    }
    return result;
}

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
}