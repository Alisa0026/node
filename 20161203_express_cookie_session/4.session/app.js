var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());

const SESSION_KEY = 'connect.sid';

//回话对象，存放所有卡号和余额
var SESSIONS = {};
app.get('/haircut', function (req,res) {
    console.log(SESSIONS)
    var oldvipid = req.cookies[SESSION_KEY];
    if(oldvipid){
        var sessionObj = SESSIONS[oldvipid];
        if(sessionObj){
            sessionObj.money -= 10;
            if(sessionObj.money <= 0){
                createCard();
            }else{
                res.send(`您还剩余${sessionObj.money}`)
            }

        }else{
            createCard();
        }
    }else{
        createCard();
    }

    function createCard(){
        //生成一个卡号
        var cardid = Date.now() + Math.random();
        //记录卡号和他的会话对象，其实就是此卡号在服务器端的对象明细
        SESSIONS[cardid] = {money:100};
        res.cookie(SESSION_KEY,cardid);
        res.send('欢迎您新顾客，送您一张价值100元的理发卡')
    }
});

app.listen(8080);