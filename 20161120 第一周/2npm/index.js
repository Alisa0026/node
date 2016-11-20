/**
 * Created by root on 2016/11/20.
 */

//引用第三方别人发布的包，会自动在当前目录下node_modules下找，
// package.json文件中对于main文件，默认是index.js，如果找不到，会向上级找，找不到报错
var baobao = require('baobao');

console.log(module.paths); //模块的查找路径