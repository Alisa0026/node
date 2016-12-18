
var Movie = require('./db').Movie;
var async = require('async');
var read = require('./read');
var write = require('./write');


var url = "http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1";


async.waterfall([
    function (callback) {
        //清空原有的集合
        Movie.remove({},callback);
    },
    function (data,callback) {
        //读取所有的电影列表
        read(url, function (err,movies) {
            callback(err,movies);
        });
    },
    function (data,callback) {
        //保存所有的电影列表
        write(data, callback);
    }

], function (err,result) {
    console.log(result);
    console.log('保存完毕');
});


