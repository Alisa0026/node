var http = require('http');
var url = require('url');
/*
* /write 客户端访问此路径的时候，服务端会向客户端写cookie
* /read 客户端访问此路径的时候，客户端会把cookie发送给服务器
* */
http.createServer(function (req,res) {
    //把url从字符串转换成对象，true表示query属性为对象
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;

    if(pathname == '/write'){ //服务端会向客户端写cookie
        //通过响应头Set-Cookie 设置cookie
        res.setHeader('Set-Cookie',['name=tom','age=8']);
        res.end('ok');

    }else if(pathname == '/read'){ //客户端会把cookie发送给服务器
        //headers所有属性全部为小写
        var cookie = req.headers.cookie;
        res.end(cookie);
    }

}).listen(8080);





