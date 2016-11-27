//node中自带一个创建服务的模块 http
var http = require('http');

//创建一个服务 固定的ip 和 端口号 还有请求和响应

http.createServer(function (req,res) {
    // req请求 是一个可读流
    // res响应 是一个可读可写流
    // pending 等待响应

    // 写响应头，告诉浏览器端，响应的内容是什么类型
    //res.writeHead(200,{'Content-Type':'text/plain;charset=utf8','hello':'123'});
    res.setHeader('Content-Type','text/plain;charset=utf8');
    res.setHeader('hello','123');
    res.statusCode = 404; //设置状态码

    res.write('hello world');
    res.end('你好');


}).listen(8080,'127.0.0.1', function () {
    console.log("以8080端口启动服务");
});




