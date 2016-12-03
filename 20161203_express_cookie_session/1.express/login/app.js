var users = [];

var express = require('express');
var path = require('path');
var app = express();

//设置模板引擎
app.set('view engine','ejs');
//设置模板存放的目录
app.set('views',path.resolve('./views'));

app.get('/singup',function(req,res){

    if(JSON.stringify(req.query) == "{}"){
        res.render('singup');
    }else{
        users.push(req.query);
        res.redirect('/singin')
    }
});

app.get('/singin',function(req,res){

    if(JSON.stringify(req.query) == "{}"){
        res.render('singin');

    }else{

        var queryuser = req.query;

        var user = users.find(function (user) {
            return user.username == queryuser.username && user.password == queryuser.password
        });

        if(user){
            res.redirect('/welcome')
        }else{
            res.redirect('/singin')
        }
    }

});

app.get('/welcome',function(req,res){

    res.render('welcome');
});


app.listen(8080);