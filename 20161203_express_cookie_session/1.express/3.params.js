var express = require('express');
var app = express();
var log = console.log;

var url = require('url');
/*
* 1.获取请求方法，请求的路径，请求的查询字符串对象
* 2.请求头
* */

app.use(function (req,res,next) {
    console.log('中间件');
    req.path1 = url.parse(req.url,true).pathname;
    req.query1 = url.parse(req.url,true).query;
    next(); //调用next 表示继续执行，不调用next表示不继续执行
});

app.get('/users',function(req,res){
    log(req.method);
    //获取请求路径
    log(req.path); //req.path = require('url').parse(req.url).pathname;
    log(111,req.path1);
    //获取查询字符串对象
    log(req.query); //req.query = require('url').parse(req.url).query;
    log(222,req.query1);
    //获取请求头
    log(req.headers);
    res.end('users');
});

//  /users/1?name=lily 也就是说路径可以写正则表达式，只要请求的字符串和此正则相匹配，则执行对应的回调函数
/*app.get(/\/users\/(\d+)$/,function(req,res){
    var result = /\/users\/(\d+)$/.exec(req.path);
    log(result);
    var id = result[1];
    res.end(id);
});*/

//指定路径参数 http://localhost:8080/users/100/add
app.get('/users/:id/:action',function(req,res){
    log(req.params); //{ id: '100', action: 'add' }
    res.end(req.params.id);
});


/*
 //配置的路径
 var config = '/users/:id/:action';
 //var config = '/users/(\w+)/(\w+)';
 //客户端请求过来的url
 var url = '/users/100/add';
 //需要得到这样的一个对象{ id: '100', action: 'add' }
 var params = {};

 var names = []; //['id','action']
 config = config.replace(/:(\w+)/g, function (matched,group1) {
 log(arguments);
 names.push(group1);
 return '(\\w+)';
 });
 //log(config); //     /users/(\w+)/(\w+)

 var reg = new RegExp(config);
 var result = reg.exec(url);
 log(result);

 for(var i=0; i < names.length;i++){
 params[names[i]] = result[i+1];
 }
 log(names);
 log(params);
 */

app.listen(8080);






