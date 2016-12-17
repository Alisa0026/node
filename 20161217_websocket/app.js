var express = require('express');

var app = express();

var last = Date.now();

app.get('/clock', function (req,res) {

    /*
    * 跨域问题：
    * Access-Control-Allow-Origin
    * Allow-Methods 跨域请求的方法 GET POST DELETE
    * Allow-Headers 跨域请求的请求头
    * */
    var now = Date.now();
    //console.log(now - last);
    last = now;

    res.setHeader('Access-Control-Allow-Origin','http://localhost:63342');
    res.send(new Date().toLocaleString());

});

app.listen(8080);