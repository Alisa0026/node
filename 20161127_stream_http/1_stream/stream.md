## Stream 流
```javascript
var fs = require("fs");
```
### 1、可读流createReadStream

- 1.创建可读流
```javascript
var rs = fs.createReadStream(path,[options]);
```
1、path读取文件的路径
2、options
> highWaterMark: 65536 最高水位线，64*1024 = 64k,一般不会调整，不能小于编码格式最小值
 encoding: null 编码格式为null => buffer
 start end 读取的开始位置和结束位置 包前包后
 flags:'r' 默认为可读
 如果指定utf8编码highWaterMark要大于3个字节 

- 2.监听data事件
流切换到流动模式,数据会被尽可能快的读出
```javascript
rs.on('data',function(data){
    //node不断触发data事件，将内容放到回调函数中
    //console.log(data.toString());
});
```

- 3.监听end事件
该事件会在读完数据后被触发 
```javascript
rs.on('end', function () {
    //获取所有结果
    console.log("读取完成")
});
```

- 4.监听error事件
```javascript
rs.on('error', function (err) {
    console.log(err);
})
```

- 5.设置编码
> 与指定{encoding:'utf8'}效果相同，设置编码
```javascript
rs.setEncoding('utf8');
```

- 6.暂停触发data恢复触发data
```javascript
rs.on('data', function (data) {
    rs.pause();
    console.log(data);
});
setTimeout(function () {
    rs.resume();
},2000);
```

### 2、可写流createWriteStream
- 1.创建可写流
```javascript
var ws = fs.createWriteStream(path,[options]);
```
>   1.path写入的文件路径
    2.options
        flags打开文件要做的操作,默认为'w'
        encoding默认为utf8
        highWaterMark写入缓存区的默认大小16kb

- 2.write方法
```javascript
ws.write(chunk,[encoding],[callback]);
-
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
```
>   chunk写入的数据buffer/string
    encoding编码格式chunk为字符串时有用，可选
    callback 写入成功后的回调
    返回值为布尔值，系统缓存区满时为false,未满时为true


- 3.end方法
```javascript
ws.end(chunk,[encoding],[callback]);
-
ws.end('把之前内容全部写完后再写内容'); //关闭掉,将内存中的你内容全部写入
//ws.end('1'); //如果写入的内存已经关闭了，就不能再写入了
```
> 调用该方法关闭文件,迫使系统缓存区的数据立即写入文件中。不能再次写入

- 4.drain方法
```javascript
ws.on('drain', function () {//抽干，干了
    console.log("吃完啦"); //嘴里吃完啦，地上也没了
});
-
var fs = require('fs');
var ws = fs.createWriteStream('./2.txt',{highWaterMark:5});
var i = 0;
function write(){
    var flag = true;
    while (flag && i<10){
        flag = ws.write(''+i++);
    }
}
write();
ws.on('drain', function () {
    write();
});
```

### 3.pipe方法
- 1.原理
```javascript
//1.默认读取64k
//2.默认写入16k
//100k  16+48+64+36
//      16+64+48(在地上)  +36
//读一会儿，写一会儿，写完再读
//默认是拼命地读，写不进去的扔地上
-
//createWriteStream createReadStream
//rs.on('data') => rs.pause() => ws.write() => ws.drain() => rs.resume() => rs.end() => ws.end()
-
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
-
ws.on('drain', function () { //写完后触发的事件
    rs.resume(); //恢复可读流
});
-
rs.on("end",function () { //读完后，将可写流关闭
    ws.end();
});
```

- 2.使用
```javascript
var fs = require("fs");
function copy(source,target){
    var rs = fs.createReadStream('./name.txt');
    var ws = fs.createWriteStream('./name1.txt');
    rs.pipe(ws); //直接将可读流导入到可写流中
}
//会防止淹没可用内存
copy('./name.txt','./name1.txt');
```