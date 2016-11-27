/*
* 1、基于文件的操作
* */
var fs = require("fs");

var rs = fs.createReadStream('./name.txt',{
        //highWaterMark:3,
        //encoding:'utf8'
        //start:0,
        //end:5
    });
//rs.setEncoding('utf8'); 设置可读流的编码格式
/*
* highWaterMark: 65536 最高水位线，64*1024 = 64k,一般不会调整，不能小于编码格式最小值
* encoding: null 编码格式为null => buffer
* start end 读取的开始位置和结束位置 包前包后
* flags:'r' 默认为可读
* */
//非流动模式切换到流动模式
//默认打开水管后，水会以最快的速度流出来，不停地触发data事件
var arr = [];
rs.on('data',function(data){
    //node不断触发data事件，将内容放到回调函数中
    //console.log(data.toString());
    arr.push(data);
});

rs.on('end', function () {
    //获取所有结果
    console.log(Buffer.concat(arr).toString())
});


