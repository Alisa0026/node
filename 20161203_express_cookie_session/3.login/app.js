var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

//cookie解析
app.use(cookieParser());
//请求体解析,处理请求提格式为 application/x-www-form-urlencoded
//都是将请求体对象加到req.body上
app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());

app.use(session({
    resave:true, //每次请求处理的时候都重新保存session
    saveUninitialized:true,//保存未初始化的session对象
    secret:'zfpx' //加密cookie
}));

//设置模板引擎为html，当你不输入模板后缀的时候，会自动添加此后缀。去查找模板文件
app.set('view engine','html');
//设置模板的存放目录
app.set('views',path.resolve('views'));
//针对此类新后缀，模板用哪个函数来进行渲染
app.engine('.html',require('ejs').__express);

var users = [];

/**
 * 1.注册的时候判断用户名是否重复
 * 2.模板使用html后缀
 * 3.在欢迎页显示登录成功人的用户名
 * 4.把提交注册表和登录表单改成post方式
 * 5.如果注册出错了，需要把出错信息放在session中，返回上一个页面的时候显示在页面上。
 */

//注册
app.get('/singup', function (req,res) {

    var error = req.session.error;
    res.render('singup',{error});

});
//处理表单的post提交
app.post('/singup', function (req,res) {

    var user = req.body;
    var olduser = users.find(function (item) {
        return item.username == user.username;
    });
    if(olduser){
        req.session.error = '用户名被占用';
        res.redirect('back')
    }else{
        users.push(user);
        res.redirect('singin');
    }

});
//登录
app.get('/singin', function (req,res) {
    res.render('singin',{});
});

app.post('/singin', function (req,res) {
    var user = req.body;

    var items = users.find(function (item) {

        return item.username == user.username && item.password == user.password
    });

    //如果用户存在
    if(items){
        req.session.user = user;
        res.redirect('welcome');
    }else{
        res.render('singin',{});
    }
});

//欢迎
app.get('/welcome', function (req,res) {
    res.render('welcome',{user:req.session.user});
});

app.listen(8080);