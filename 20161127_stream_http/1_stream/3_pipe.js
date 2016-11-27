//1.默认读取64k
//2.默认写入16k
//100k  16+48+64+36
//      16+64+48(在地上)  +36
//读一会儿，写一会儿，写完再读
//默认是拼命地读，写不进去的扔地上

//createWriteStream createReadStream
//rs.on('data') => rs.pause() => ws.write() => ws.drain() => rs.resume() => rs.end() => ws.end()

var fs = require("fs");
var rs = fs.createReadStream('./name.txt',{
    highWaterMark:4
});
var ws = fs.createWriteStream('./name1.txt',{
    highWaterMark:1
});
rs.on('data',function(data){
    var flag = ws.write(data); //向可写流中写入内容
    console.log(data,flag);
    if(!flag){ //如果无法写入
        rs.pause(); //先不读了
    }
});

ws.on('drain', function () { //写完后触发的事件
    rs.resume(); //恢复可读流
});

rs.on("end",function () { //读完后，将可写流关闭
    ws.end();
});


