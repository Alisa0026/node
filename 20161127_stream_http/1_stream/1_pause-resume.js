/*
* 1、基于文件的操作
* */
var fs = require("fs");

var rs = fs.createReadStream('./name.txt',{
        highWaterMark:3
        //encoding:'utf8'
        //start:0,
        //end:5
    });

var str = "";

//监听data方法 读值
rs.on('data',function(data){
    str += data;
    console.log(str);
    rs.pause(); //暂停触发data事件
    setTimeout(function () {
        rs.resume();//再次触发data事件
    },1000);
});

//只有读完后才会触发end方法 取值
rs.on('end', function () {
    //获取所有结果
    console.log(11,str)
});

//暂停和恢复

