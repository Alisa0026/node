//node中自带一个创建服务的模块 http
var http = require('http');
var fs = require('fs');
var url = require('url');

//创建一个服务 固定的ip 和 端口号 还有请求和响应
//路由:通过不同的路径，响应不同的内容
http.createServer(function (req,res) {
    //默认访问http://localhost:8080 相当于/
    var urlObj = url.parse(req.url,true);
    var pathName = urlObj.pathname;
    console.log(pathName);//请求路径

    /*console.log(req.url);//请求路径  http://localhost:8080/?a=1
    console.log(req.method);//请求方法
    console.log(req.headers);//请求头*/

    /*if(pathName == '/'){
        res.setHeader('Content-Type','text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }else if(pathName == '/index.css'){
        res.setHeader('Content-Type','text/css;charset=utf8');
        fs.createReadStream('./index.css').pipe(res);
    }else if(pathName == '/index.js'){
        res.setHeader('Content-Type','application/x-javascript;charset=utf8');
        fs.createReadStream('./index.js').pipe(res);
    }*/

    //减少冗余代码
    if(pathName == '/'){
        res.setHeader('Content-Type','text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }else { // ./index.js 使用mime 类型对照表(第三方)
        //在设置之前要先判断文件是否存在，不存在 404
        fs.exists('.' + pathName, function (exists) {
            if(exists){
                res.setHeader('Content-Type',require('mime').lookup(pathName) + ';charset=utf8');
                fs.createReadStream('.' + pathName).pipe(res);
            }else{
                res.statusCode = 404;
                res.end("Not Found");
            }
        })
    }
}).listen(8080);




