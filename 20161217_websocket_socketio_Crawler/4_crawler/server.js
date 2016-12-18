var express = require('express');
var path = require('path');
var Movie = require('./db').Movie;


var app = express();
/*
* 1.读出所有电影数组
* 2.渲染模板并返回给客户端
* */

app.use(express.static(path.resolve('public')));


//设置模板引擎为html，当你不输入模板后缀的时候，会自动添加此后缀。去查找模板文件
app.set('view engine','html');
//设置模板的存放目录
app.set('views',path.resolve('views'));
//针对此类新后缀，模板用哪个函数来进行渲染
app.engine('.html',require('ejs').__express);



app.get('/', function (req,res) {
    Movie.find({}, function (err,movies) {
        //console.log(doc);
        if(err){
            res.render('error',{err})
        }else{
            res.render('index',{movies});
        }
    });

});

app.listen(8080);


