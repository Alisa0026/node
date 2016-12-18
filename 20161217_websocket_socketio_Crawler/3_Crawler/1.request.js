/*
*  request 第三方请求模块，用于发送http请求
* */

var request = require('request');
var fs = require('fs');
var iconv = require('iconv-lite');

var url = "http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1";

/*
* 当请求响应完成之后调用回调函数
* err 错误对象
* response 响应对象
* body 响应体
* */

/*
* 有乱码格式，网页是gbk的格式
* request(url, function (err, response, body) {
    console.log(response.header); //响应头
    console.log(response.statusCode); //状态码
    console.log(body);
});*/

/*
* encoding:null 获取的是buffer格式
*
* */
request({url,encoding:null}, function (err, response, body) {
    body = iconv.decode(body,'gbk'); //将响应体转成utf-8的字符串，写到文件里去
    console.log(body);
    fs.writeFile('./baidu.html',body);
});