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
    request.save(); //把拿到的信息都存到mongoDB -step 1. Step 2添加至url.html希望显示什么


};

var getUrlInfo = function (shortUrl, info, callback) {
    if (info === 'totalClicks') { //RequestModel对应数据库的一个collection(即数据库的一个表)
        RequestModel.count({shortUrl: shortUrl}, function (err, data) {
            callback(data);
        });
        return;
    }
    /*
     if (info === 'hour') {
     groupId= {
     year: {$year: "$timestamp"},
     month: {$month: "$timestamp"},
     day: {$dayOfMonth: "$timestamp"},
     hour: {$hour: "$timestamp"},
     minutes: {$minute: "$timestamp"}
     }
     }
     */
    var groupId = "";
    if (info === 'hour') {
        groupId = {
            year: {$year: "$timestamp"}, //把同一年的东西分成一组, 去timestamp 拿年
            month: {$month: "$timestamp"},
            day: {$dayOfMonth: "$timestamp"},
            hour: {$hour: "$timestamp"},
            minutes: {$minute: "$timestamp"} //把2015年9月5日14时53分的所有请求都放在一个地方,按照每一个分钟去group
        }
    } else if (info === 'day') {
        groupId = {
            year: {$year: "$timestamp"}, //把同一年的东西分成一组, 去timestamp 拿年
            month: {$month: "$timestamp"},
            day: {$dayOfMonth: "$timestamp"},
            hour: {$hour: "$timestamp"}
        }
    } else if (info === 'month') {
        groupId = {
            year: {$year: "$timestamp"}, //把同一年的东西分成一组, 去timestamp 拿年
            month: {$month: "$timestamp"},
            day: {$dayOfMonth: "$timestamp"}
        }
    } else {
        groupId = "$" + info;
    }

    //得到每一个值具体的count
    RequestModel.aggregate([
        {
            $match: { //希望通过shortUrl排序
                shortUrl: shortUrl
            }
        },
        {
            $sort: {
                timestamp: -1
            }
        },
        {
            $group: {  //希望基于$info,即传过来的参数的那一项来group: 基于referer or country group
                _id: groupId,
                count: {
                    $sum: 1
                }
            }

        }
    ], function (err, data) {
        callback(data);
    });

};


module.exports = {
    logRequest: logRequest,
    getUrlInfo: getUrlInfo
}
