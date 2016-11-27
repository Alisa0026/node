//mime 类型对照表（第三方）

var mime = require('mime');

var pathname = "./index.css";
console.log(mime.lookup(pathname)); //  text/css




