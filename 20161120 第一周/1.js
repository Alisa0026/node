/**
 * Created by root on 2016/11/20.
 */
function read(callback){
    setTimeout(function(){
        console.log("读好了");

        callback();

    },2000);

    return 1;
}

function write(){
    console.log("写好了");

}

var a = read(write);
console.log(a);

//同步和异步 针对主线程
//同步可以马上拿到返回值，异步函数都有回调函数

//阻塞和非阻塞    针对内核来说
//非阻塞是异步的前置条件

//IO Input(输入) Output(输出) 文件的操作

//单线程和多线程 针对当前进程来说的
//单线程--程序按顺序执行，
//多线程--同时可以执行多个任务
//node单线程指的主线程是单线程的，所有非阻塞的部分交给一个线程池处理，然后这个主线程通过一个队列跟线程池协作

//事件环 当前和下一个小本
//管理异步动作、定时器和回调函数的机制叫事件环
//



