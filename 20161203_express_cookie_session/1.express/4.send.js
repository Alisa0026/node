var express = require('express');
var app = express();
//users里面存放所有的用户
var users = [
    {id:1,name:'lily'},
    {id:2,name:'lucy'}
];
//访问/users/1 返回{code:"success",data:{"id":1,"name":"lily"}}
//访问/users/3 返回{code:"fail",data:"此用户不存在"}
//编写一个路由，当客户端访问 /users/id的时候会执行此路由
app.get('/users/:id',function (req,res) {
    //获取路径参数 id
    var id = req.params.id;
    //find 方法有一个参数是一个函数，此函数接收一个用户对象，
    // 可以有一个返回值，如果返回true，表示找到了目标对象，会把此目标对象作为find方法的返回值，
    // 如果返回false，会继续往下找
    var user = users.find(function (user) {
        return user.id == id
    });
    if(user){
        res.end(JSON.stringify({code:"success",data:user}));
    }else{
        res.end(JSON.stringify({code:"fail",data:"此用户不存在"}));
    }

/*  var result;
    for(var i=0;i<users.length;i++){
        if(users[i].id == req.params.id){
            result = JSON.stringify({
                code:'success',
                data: users[i]
            });
            break;
        }
    }

    if(!result){
        result = JSON.stringify({
            code:'fail',
            data:'用户不存在'
        })
    }

    res.setHeader("Content-Type","text/html;charset=utf-8");
    res.end(result);*/
    //res.send(result);
});

app.listen(8080);







