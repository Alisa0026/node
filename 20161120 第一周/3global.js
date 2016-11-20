/**
 * Created by root on 2016/11/20.
 */

//不用声明可以直接使用的对象
//console.log(global);
/*
//console 输出顺序不确定的
console.log("log"); //输出日志
console.info("info"); //输出信息
console.error("error");//输出错误
console.warn("warn"); //输出警告

var time = new Date().getTime();
var time1 = new Date().getTime();
console.log(time1 - time);

console.time('start');//时间，计算代码执行的事件
console.timeEnd('start'); //打印time开始到timeEnd结束中间的事件
*/


//2.__filename __dirname 并且不是global上的属性
//console.log(__filename); //当前文件的绝对路径
//console.log(__dirname);//当前文件所在的文件夹的绝对路径
//文件外面套了一层函数，它里面包含了一些形参，是这个函数的形参

/*
(function(require,module,exports,__filename,__dirname){
    //3.文件里才能访问这5个参数

})();
*/

//3、setTimeout 定时器，this不是global
/*
setTimeout(function(){
    console.log(this)
},1000);

function sum(a,b){
    console.log(a + b);
}
//setTimeout(sum,1000); //NaN 因为a和b都是undefined
//setTimeout(sum,1000,1,2); //3 可以将参数从第三位开始传入
 */


//4.setImmediate 立即 和setTImeout一样是一个异步方法
//--setImmediate不能指定时间
//--如果setTimeout不指定时间，setImmediate 不一定比setTimeout快
/*
setImmediate(function(){
    console.log("马上");
});

setTimeout(function(){
    console.log("setTimout")
},0);
*/


//5.process 进程
//1) pid 进程的id好 kill 杀死进程
//console.log(process);
//console.log(process.pid);

//2) process.kill(pid) 杀死进程
//setTnterval(function(){},2000); //不执行完进程就不会结束

//3) process.cwd(); //current working directory 当前工作文件夹
//4) process.chdir('..'); //change directory 改变工作目录
//console.log(process.cwd()); //这个是可以修改目录的
//console.log(__dirname); //__dirname的值是不会修改的，这个是初始给的目录

//5) nextTick是一个异步方法，他比setTimeout和setImmediate更早一些
//process.nextTick(); //下一队列（在第一个小本的末尾，在第二个小本之前）

/*console.log(1);

process.nextTick(function(){
    console.log("买包");
});

setTimeout(function(){
    console.log("休息")
},0);*/

//同步方法先执行 > process.nextTick > setTimeout > IO

//global
//process 进程
//Buffer缓存
//setImmediate 立即
//setTnterval
//setTimeout 定时器
//console
