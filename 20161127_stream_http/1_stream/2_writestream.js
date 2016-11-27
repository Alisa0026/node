var fs = require("fs");

var ws = fs.createWriteStream('./name.txt',{
    highWaterMark:1
});
//console.log(ws);
//highWaterMark: 16384  默认写入大小，16*1024
//defaultEncoding: 'utf8'  写入内容默认编码格式是utf8

//write end
//write 和 end中只能放入buffer或者字符串
//ws.write(1); //报错
var flag = ws.write("12",function(){
    console.log("ok");
});
console.log(flag); //返回boolean类型，告诉内存是否能否再写入

//1.喂饭，会给一个反馈，告诉你是否还能吃下
//2.如果吃不了，就不要再喂了，多余的部分丢到地上
//3.等吃完了，我把地上捡起来吃
//4.等再吃完了，我消化好了再继续吃

/*ws.on('drain', function () {//抽干，干了
    console.log("吃完啦"); //嘴里吃完啦，地上也没了
});*/

//end
ws.end('把之前内容全部写完后再写内容'); //关闭掉,将内存中的你内容全部写入
//ws.end('1'); //如果写入的内存已经关闭了，就不能再写入了

//write 和 end特点
//1.里面只能放字符串，end后不能再调用write方法
//2.drain方法，吃完了的方法