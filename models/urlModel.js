/**
 * Created by brendaZh on 8/23/16.
 */
//我希望数据库有一个表,就是存数据库的mapping
//首先要拿到mongoose. 因为我们要调用他的一些成员变量
var mongoose = require('mongoose');
//nosql 不是没有schema, 只是不是显性的schema而是隐性的。 我们希望读回来的数据能够被解析,并希望写入数据库的data follow 一定得schema
var schema = mongoose.Schema;
//用以构造schema的构造函数
var UrlSchema = new Schema({
//TODO: check why js file is not recognised here
});
