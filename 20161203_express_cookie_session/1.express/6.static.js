var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');

//2. 原理--->一个中间件来响应所有的静态文件请求
//此中间件接收到客户端的请求后，会先去public目录下找一下有没有这个文件，
// 如果有这个文件，读出来返回客户端，如果没有这个文件，调用next
app.use(function (req,res,next) {
    //req.path; /imgs/baidu.png
    //res.sendFile(path.resolve('./public' + req.path));
    fs.exists('./public' + req.path, function (exists) {
        if(exists){
            res.sendFile(path.resolve('./public' + req.path));
        }else{
            next();
        }
    })
});

//3. 实际使用--->使用静态文件中间件，并指定静态文件根目录
app.use(express.static(path.resolve('./public')));

//1.获取静态文件的几种方式（原理），文件如果变多，则要使用中间件->看2
app.get('/index.html', function (req,res) {
    //一、流
     fs.createReadStream('./public/index.html').pipe(res);

    //二、express deprecated res.sendfile: Use res.sendFile instead
    res.sendfile('./public/index.html');

    //三、path must be absolute or specify root to res.sendFile
    //1.如果路径是一个相对路径，需要指定root参数表示是相对哪个绝对路径的相对路径
    res.sendFile('./public/index.html',{root:__dirname});
    //2.path.resolve 可以将相对路径转换成绝对路径
    res.sendFile(path.resolve('./public/index.html'));
});

app.listen(8080);

