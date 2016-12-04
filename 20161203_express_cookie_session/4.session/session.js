var express = require('express');
//会话中间件,负责把客户端在服务器对应的数据对象取出来赋给req.session
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();

app.use(session({
    resave:true, //每次请求处理的时候都重新保存session
    saveUninitialized:true,//保存未初始化的session对象
    secret:'zfpx' //加密cookie
}));

app.get('/hair', function (req,res) {
    //取出session对象中的money属性
    var money = req.session.money;
    if(money){//如果有值，说明设置过，减去10即可
        req.session.money -= 10;
        res.send(`剩余金额：${req.session.money}`)
    }else{ //如果没有值，以前没设置过，初始化为100
        req.session.money = 100;
        res.send(`一张新卡：${req.session.money}`)
    }
});

app.listen(8080);