/**
 * 读取url地址，得到电影对象数组
 * @param url 电影列表的url
 * @param callback
 */
var request = require('request');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');


module.exports = function(url,callback){

    //读取url地址中的响应体
    request({url,encoding:null}, function (err,response,body) {

        //把buffer转成utf8的字符串
        body = iconv.decode(body,'gbk');

        //把body转成JQuery对象
        var $ = cheerio.load(body);
        var items = [];

        $('.keyword .list-title').each(function () {
            var $me = $(this);
            var item = {
                name : $me.text(),
                url : $me.attr('href')
            };
            console.log('读取：' + item.name);
            items.push(item);
        });

        //调用回调函数，传入错误对象和数组
        callback(err,items);
    });
};

/*
var url = "http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1";

module.exports(url, function (err,movies) {
    console.log(movies);
});
*/


