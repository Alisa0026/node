var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

//基本上所有的中间件模块都是一个函数，都需要调用一下才能放到use里
app.use(cookieParser());

//host地址 C:\Windows\System32\drivers\etc

app.get('/write', function (req,res) {
    //res.cookie('name','Tom');
    //设置此cookie属性属于哪个域名所有
    //res.cookie('name','Tom',{domain:'a.zfpx.cn'});
    //设置此cookie属于哪个路径，只有向此路径发送请求才会发送此cookie
    //res.cookie('name','Tom',{path:'/read1'});
    //设置cookie的有效期，在有效期内可以读取，过了有效期，浏览器删除此cookie
    //res.cookie('name','Tom',{maxAge:10*1000});
    res.cookie('name','Tom',{httpOnly:true,expires:new Date(Date.now() + 10*1000)});

    res.send("ok");
});
app.get('/read1', function (req,res) {
    res.send(req.cookies);
});
app.get('/read2', function (req,res) {
    res.send(req.cookies);
});

app.listen(8080);