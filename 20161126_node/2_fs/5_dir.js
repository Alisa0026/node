var fs = require('fs');

//读取儿子辈的
/*var arr = fs.readdirSync('../2_fs');
console.log(arr); //默认是数组类型
//判断文件状态
var res = fs.statSync('../2_fs/test.txt');
console.log(res);
console.log(res.isDirectory()); //是否是文件夹
console.log(res.isFile()); //是否是文件*/
/*
 atime: 2016-11-26T07:51:57.636Z, access time 访问时间
 mtime: 2016-11-26T07:52:19.700Z, modify time 修改时间（文件有没有动过）
 ctime: 2016-11-26T07:52:19.700Z, change time 改变时间（文件内容是否改变）
 birthtime: 2016-11-26T07:51:57.636Z birth time 出生时间
*
* */

var items = fs.readdirSync('a');
items.forEach(function (item) {
    var stat = fs.statSync('a/'+item);
    if(stat.isFile()){ //判断是否是文件
        fs.unlinkSync('a/'+item); //删除文件
    }
    if(stat.isDirectory()){ //判断是否是文件夹
        fs.rmdirSync('a/'+item); //删除文件夹
    }
});