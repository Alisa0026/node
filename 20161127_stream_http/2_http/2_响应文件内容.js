//node中自带一个创建服务的模块 http
var http = require('http');
var fs = require('fs');

//创建一个服务 固定的ip 和 端口号 还有请求和响应
//路由:通过不同的路径，响应不同的内容
http.createServer(function (req,res) {

    //var data = fs.readFileSync('./index.html'); //同步
    //var data = fs.readFile('./index.html'); //异步
    //res.end(data); //end中有什么内容就会展示给客户端
    res.setHeader('Content-Type','text/html;charset=utf8');
    //可读流pipe到可写流中，pipe中已经调用了end方法
    fs.createReadStream('./index.html').pipe(res);


}).listen(8080);




