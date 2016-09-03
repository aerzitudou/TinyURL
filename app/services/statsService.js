var RequestModel = require('../models/requestModel');
var geoip = require('geoip-lite');

var logRequest = function (shortUrl, req) {
    var reqInfo = {};
    reqInfo.shortUrl = shortUrl;
    reqInfo.referer = req.headers.referer || 'Unknown'; //which website does the request comes from
    reqInfo.platform = req.useragent.platform || 'Unknown';
    reqInfo.browser = req.useragent.browser || 'Unknown';
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress; //nodeJs 拿ip 的套路
    var geo = geoip.lookup(ip); //if click from localhost then it is 127.0.0.1. You can't tell the country from a localhost ip.
    if (geo) {
        reqInfo.country = geo.country;
    } else {
        reqInfo.country = 'Unknown';
    }
    reqInfo.timestamp = new Date();
    var request = new RequestModel(reqInfo);
    request.save();


}


module.exports = {
    logRequest: logRequest
}
