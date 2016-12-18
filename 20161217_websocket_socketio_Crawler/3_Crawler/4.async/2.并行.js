/*
* 并行执行
* */
var async = require('async');

console.time('cost');

async.parallel([
    function (callback) {
        setTimeout(function(){
            callback(null,'111买萝卜');
        },1000);
    },
    function (callback) {
        setTimeout(function(){
            callback(null,'222买黄瓜');
        },2000);
    },
    function (callback) {
        setTimeout(function(){
            callback(null,'333买南瓜');
        },2*3600);
    }
],function (err,result) {
    console.log(err);
    console.log(result);
    console.timeEnd('cost');
});
