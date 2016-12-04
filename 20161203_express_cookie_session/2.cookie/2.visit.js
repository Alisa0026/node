var http = require('http');
var url = require('url');
var querystring = require('querystring');
/*
* 服务器接收一个/visit的请求
* 客户端第1次访问服务器的时候 返回 欢迎你第1次光临
* 客户端第2次访问服务器的时候 返回 欢迎你第2次光临
* */
http.createServer(function (req,res) {
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;

    if(pathname == '/visit'){
        var cookie = req.headers.cookie;
        var visit = 1;
        if(cookie){
            var cookieObj = querystring.parse(cookie,'; ');
            if(cookieObj.visit){
                visit = parseInt(cookieObj.visit) + 1;
            }
        }

        res.setHeader('Set-Cookie',"visit="+visit);
        res.end(`欢迎你第${visit}次光临`);
    }

}).listen(8080);