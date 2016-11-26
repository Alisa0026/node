//path是一个和核心模块
var path = require('path');
//一般情况下我们会以一个相对路径来解析出一个绝对路径

//1、path.join() 将多个路径拼在一起
console.log(path.join('a','b','c')); //  a\b\c
console.log(path.join(__dirname + '/a.js')); //  d:\BaiduYunDownload\NodeWorkSpace\node10\20161126_node\3_path\a.js
console.log(path.join(__dirname,'/a.js')); //  d:\BaiduYunDownload\NodeWorkSpace\node10\20161126_node\3_path\a.js

//2、path.resolve() 解析绝对路径,通过不存在的文件名解析出绝对路径
console.log(path.resolve('b.js'));//d:\BaiduYunDownload\NodeWorkSpace\node10\20161126_node\3_path\b.js
