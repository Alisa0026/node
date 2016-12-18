//加载mongoose模块
var mongoose = require('mongoose');

//协议名://IP或者域名/数据库名字
mongoose.connect('mongodb://127.0.0.1:27017/201610node');

var MovieSchema = new mongoose.Schema({
    name: String,
    url: String

},{collection:'movie'}); //collection 是集合名字

//定义操作数据库的模型
var Movie = mongoose.model('Movie',MovieSchema);

exports.Movie = Movie;