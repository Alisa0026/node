var cheerio = require('cheerio');
var fs = require('fs');

/**
 * 1.读取你保存的baidu.html
 * 2. 使用cheerio把里面的电影列表提取出来 {name:'血战钢锯岭',url:'https://www.baidu.com/baidu?cl=3&tn=SE_baiduhomet8_jmjb7mjw&fr=top1000&wd=%C4%E3%B5%C4%C3%FB%D7%D6'}
 * 3.然后打印出来
 *
 */

fs.readFile('./baidu.html',"utf8",function(err,data){
    //console.log(data);

    //会把此字符串转成类似JQuery的对象
    var $ = cheerio.load(data);
    var items = [];

    //$('.keyword .list-title') 返回一个集合
    $('.keyword .list-title').each(function () {
        var $me = $(this);
        var item = {
            name : $me.text(), //得到这个元素的文本
            url : $me.attr('href') //得到这个元素的href属性
        };
        //console.log($(this).text());
        //console.log($(this).attr('href'));

        items.push(item);
    });

    console.log(items);

});

