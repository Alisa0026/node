//node 中的核心模块 file system
var fs = require('fs');
//读取 写入 同步和异步同时出现
//有没有返回值 有没有回调函数 判断是否是异步
//fs.readFile(); //异步方法
//fs.readFileSync(); //同步方法

//默认类型r，默认编码格式buffer
var name = fs.readFileSync('./node.txt',{flag:'r',encoding:"utf8"});
//指定编码是utf8
var name1 = fs.readFileSync('./node.txt',"utf8");

var name2 = fs.readFile('./node.txt',function(err,data){ //error first
    console.log(arguments);
});
console.log(name2);