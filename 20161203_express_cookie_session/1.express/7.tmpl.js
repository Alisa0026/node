var express = require('express');
var path = require('path');
var app = express();
var users = [
    {id:1,name:'lily'},
    {id:2,name:'lucy'}
];
console.log(path.resolve('./node_modules'))
app.use(express.static(path.resolve('./node_modules')));
//设置模板引擎
app.set('view engine','ejs');
//设置模板存放的目录
app.set('views',path.resolve('./views'));
/*
* 模板引擎用于把静态的模板内容和数据对象进行渲染得到HTML发送给客户端
* npm install --save
* */

app.get('/',function(req,res){
    /*var result = "";
    users.forEach(function (user) {
        result += '<li class="list-group-item">' + user.id + ':' + user.name + '</li>'
    })*/

    //第一个参数是模板的相对路径，第二个参数是数据对象,
    // 在模板中得到数据对象的属性
    res.render('user',{users:users});
});
app.all('*', function (req,res) {
    res.redirect('/')
});
app.listen(8080);




