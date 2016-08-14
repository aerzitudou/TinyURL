var getLongUrl = function (shortUrl, shortToLongMap) {
    var longUrl = shortToLongMap.get(shortUrl.toString());
    console.log(longUrl);
    return longUrl;
};

var getShortUrl = function (longUrl, shortToLongMap, longToShortMap) {
    if (longUrl.toString().indexOf('http') === -1) {
        longUrl = 'http://' + longUrl.toString();
    }

    if (longToShortMap.get(longUrl.toString()) != null) {
        return longToShortMap.get(longUrl.toString());
    }

    else {
        var shortUrl = generateShortUrl(longToShortMap);
        longToShortMap.set(longUrl.toString(), shortUrl);
        shortToLongMap.set(shortUrl, longUrl.toString());
        return shortUrl;
    }

}

var generateShortUrl = function (longToShortMap) {
    return longToShortMap.keys().length.toString()
}

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
}