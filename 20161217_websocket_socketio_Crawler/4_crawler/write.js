/**
 * 把电影对象数组保存到数据库中
 */
var Movie = require('./db').Movie;
var async = require('async');

module.exports = function(items,callback){
    //循环数组中的每一个元素，依次传入迭代函数
    async.forEach(items,function (item,cb) {
        //保存一个对象，保存后调用cb回调函数,表示当前任务执行完毕
        Movie.create(item, function (err,doc) {

            console.log('写入:',doc.name);
            cb(err,doc);
        });

    },callback);
};

/*module.exports([
    { name: '血战钢锯岭',
        url: 'http://www.baidu.com/baidu?cl=3&tn=SE_baiduhomet8_jmjb7mjw&fr=top1000&wd=%D1%AA%D5%BD%B8%D6%BE%E2%C1%EB' },
    { name: '你的名字',
        url: 'http://www.baidu.com/baidu?cl=3&tn=SE_baiduhomet8_jmjb7mjw&fr=top1000&wd=%C4%E3%B5%C4%C3%FB%D7%D6' }
], function (err,result) {
    console.log('保存完毕');
});*/
