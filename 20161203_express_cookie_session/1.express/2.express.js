//引入express模块，返回值是一个函数
var express = require('express');
//调用此函数会返回一个新的函数
var app = express();

/* 原理
function add(a){
    return function(b){
        return a + b;
    }
}

var newAdd = add(1);
console.log(newAdd(2));
*/

//使用中间件，中间件也是一个函数
//不管是何种方法，那种路径都会执行此中间件函数
/*
* 1.中间件可以用来增加共有方法和属性
* */
app.use(function (req,res,next) {
    console.log('中间件');
    res.setHeader("Content-Type","text/html;charset=utf-8");
    next(); //调用next 表示继续执行，不调用next表示不继续执行
});

//某个路由需要单独定义的中间件，单独在路由的 路径和回调函数中间增加log
function log(req,res,next){
    console.log(req.url);
    next();
}

//如果客户端以get方法向服务器发送 / 路径请求的话，由第二个参数来进行处理
app.get('/',log,function(req,res){
    //res.setHeader("Content-Type","text/html;charset=utf-8");
    res.end('首页');
});
app.get('/about',function(req,res){
    //res.setHeader("Content-Type","text/html;charset=utf-8");
    res.end('关于我们');
});

//all 不关心方法名，能匹配所有的方法，只匹配路径即可
app.all('/home',function(req,res){
    //res.setHeader("Content-Type","text/html;charset=utf-8");
    res.end('回家');
});

//* 匹配所有路径
app.get('*',function(req,res){
    //res.setHeader("Content-Type","text/html;charset=utf-8");
    res.end('星星');
});

//app 的核心本质就是一个请求监听函数
app.listen(8080);

/*
app.listen = function listen() {
    var server = http.createServer(this); //this 是 app,app是请求的回调函数
    return server.listen.apply(server, arguments); //server.listen(8080)
};
* */

