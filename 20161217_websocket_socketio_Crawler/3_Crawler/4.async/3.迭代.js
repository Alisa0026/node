var items = [
    {filename:'1.txt',content:'1'},
    {filename:'2.txt',content:'2'},
    {filename:'3.txt',content:'3'}
];

/**
 保存三个文件，文件名和文件内容不一样，
 但要求三个文件都保存完毕之后输出一个日志 "全部保存完毕
 **/


var async = require('async');

async.forEach(items, function (item,callback) {
    //console.log(arguments);
    fs.writeFile(item.filename,item.content,'utf-8',callback)

}, function (err) {
    console.log(err);
    console.log("全部保存完毕");
});