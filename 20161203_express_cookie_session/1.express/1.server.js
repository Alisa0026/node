var http = require('http');
var url = require('url');

var server = http.createServer(function(req,res){
    var pathName = url.parse(req.url).pathname;

    if(pathName == '/'){
        res.end("首页");
    }else if(pathName == '/about'){
        res.end("关于我们");
    }else{
        res.end("未知页面");
    }
});
//在本地服务器上监听8080端口
server.listen(8080);

/*
var app = function(req,res){
    var pathName = url.parse(req.url).pathname;

    if(pathName == '/'){
        res.end("首页");
    }else if(pathName == '/about'){
        res.end("关于我们");
    }else{
        res.end("未知页面");
    }
}
var server = http.createServer(app);*/

