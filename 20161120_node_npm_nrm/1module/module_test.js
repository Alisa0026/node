/**
 * Created by root on 2016/11/20.
 */

//a 相当于module.exports
//b 相当于exports
var a = b = {};

//1.将属性挂载到exports对象上，可以通过module.exports拿到
b.calc = 1;
console.log(a); //{ calc: 1 }

//2.将exports对象直接指向新的空间，不会影响module.exports的值
b = 1;
console.log(a); //{}

//3.如果直接把module.exports导出改变，最后导出module.exports肯定会改变

//原理伪代码
//require最终拿到的就是module.exports

/*
(function(require,module,exports,__filename,__dirname){
    this = exports = {};

    module.exports = exports = {};
    xxx.js
    return module.exports
})();
*/

//写person.js 写一个person的类 使用一个userPerson.js 使用这个Person类