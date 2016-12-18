/**
 *  串行执行，把此任务数组中的异步函数一个接一个的执行
 *  上一个执行完毕后再执行下一个任务
 */
var async = require('async');

console.time('cost');
/*原理*/
function series(tasks,callback){
    var index = 0;
    var result = [];

    next();
    function next(err,data){
        if(err){
            callback(err,result)
        }
        if(index > 0){
            result.push(data);
        }

        var task = tasks[index++];
        if(task){

            task(next);
        }else{
            callback(null,result)
        }
    }
}

async.series([
//series([
    function (callback) {
        setTimeout(function(){
            console.log('买菜');
            //如果在异步任务中调用了callback,就意味着异步任务执行完毕
            callback(null,'买菜');
        },1000);

    },
    function (callback) {
        setTimeout(function(){
            console.log('做饭');
            callback(null,'做饭');
        },2000);
    },
    function (callback) {
        setTimeout(function(){
            console.log('吃饭');
            callback(null,'吃饭');
        },3000);
    }
],function (err,result) {
    console.log(err);
    console.log(result);
    console.timeEnd('cost');
});