/*
*
*
* */

var CronJob = require('cron').CronJob;

/**
 * 创建一个计划任务
 * 秒(0-59) 分(0-59) 时(0-23) 日(1-31) 月份(1-12) 星期(1-7)
 * 1参数是 执行的时机
 *   1. * 代表所有的可能的值
 *   2. 固定的值
 *   3. 1-5 代给一个区间的范围，是指1到5 1 2 3 4 5
 *   4.枚举值 1,3,5,7
 *   5.
 * 2参数是 执行函数
 * 2016年12月18日11:54:07
 * 希望
 * 每周的周一和周五晚上6点执行一次
 *
 *
 */

var job = new CronJob('0 0 18 * * 1,5', function () {
    console.log(new Date().toLocaleString());
});

//每隔5s执行一次
var job2 = new CronJob('*/5 * * * * *', function () {
    console.log(new Date().toLocaleString());
});

job.start();