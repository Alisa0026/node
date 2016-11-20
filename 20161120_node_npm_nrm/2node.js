/**
 * Created by root on 2016/11/20.
 */


console.log(this);

(function(){
    console.log(this);
})();

//node中全局对象
//在文件中直接访问this this就不是global，因为文件外套了一层函数，在函数中改变了this指向

var a = 100;
console.log(global.a); //这样是访问不到a的，要想访问，需要去掉var