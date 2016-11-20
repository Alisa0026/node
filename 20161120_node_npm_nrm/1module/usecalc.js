/**
 * Created by root on 2016/11/20.
 */
/*文件模块*/
/*var calc = require('./calc.js'); //引用的是文件类型，所以使用相对路径
//默认+js后缀找，找不到+json

console.log(calc); //{} calc里面没写内容并没有exports时是空对象；当写了exports.calc = calc; 其实是{calc:calc} = exports

//require 返回的并不是 exports对象
//require 返回的是 module.exports对象 exports = calc
//require 是一个同步方法，他相当于，把另一个文件读取过来放到当前文件下执行
*/


/*模块的缓存机制*/
//加载模块后会缓存，多次加载后得到同一个对象require

//清除缓存，多次引用多次执行

require('./calc.js');

//1.在此处删除cache里面缓存的cache.js
//2.我们需要获得一个绝对的路径，通过绝对路径获取对应的模块
require.resolve('./calc.js'); //通过"已存在"的相对路径解析出一个绝对路径
//console.log(require.resolve('./calc.js')); //d:\BaiduYunDownload\NodeWorkSpace\node10\20161120 第一周\1module\calc.js

//3.在缓存对象中通过绝对路径取出对应的模块进行删除
delete require.cache[require.resolve('./calc.js')];

require('./calc.js'); //再进行加载

//缓存根据绝对路径进行的缓存，因为不同的文件夹里包含着相同的文件名
//console.log(require);

//获得缓存
console.log(require.cache);