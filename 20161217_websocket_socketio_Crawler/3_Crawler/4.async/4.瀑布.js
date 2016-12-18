var async = require('async');
/*
* 上一个任务的返回值会传给下一个任务
* 最后一个任务的返回值传递给最终的回调
* */
async.waterfall([

    function (cb) {
        cb(null,'白菜')
    },
    function (data,cb) {
        console.log(data);
        cb(null,'炒' + data)
    },
    function (data,cb) {
        console.log(data);
        cb(null,'吃' + data)
    }

], function (err,result) {
    console.log(result); //吃炒白菜
});


