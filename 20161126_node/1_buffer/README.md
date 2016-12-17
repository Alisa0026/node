## Buffer
1、固定大小，一旦声明不能更改大小
2、和数组存储方式大致相同，buffer存储的是16进制
默认是数据传输时是2进制，存到buffer中变成6进制

- 字节
8bit = 1b 一个字节等于8个位（都是二进制的 由8个二进制组成）
1024b = 1kb
1024kb = 1m

> 1个汉字utf8编码有几个字节 3个字节 node不支持gbk 
  1个汉字由多少位组成 24位

### 1、定义buffer的三种方式 
三种声明方式

- 1、通过长度定义buffer
```javascript
var buffer = new Buffer(3); //随机在我们的内存中拿出三个地方
buffer.fill(0); //手动清空内存
//如果大于255 则对256取模
//如果为负值，会在256的基础上+负值
```

- 2、通过数组定义buffer
```javascript
var buffer = new Buffer(array); 
var buffer = new Buffer([1,2,3]);  //给buffer中每一项都为一个固定的值
//将10进制除以进制取余数 将10进制转换成任意进制
```

- 3、字符串创建
```javascript
var buffer = new Buffer(str,[encoding]);
var buffer = new Buffer("你好");
```

### 2、buffer常用方法
- 1、特点
```javascript
var str = "你好";
str[0] = "好";
console.log(str); //"你好" 字符串具有不变性
```
- 2、数组 slice克隆一个新的数组
```javascript
var arr = [1,2,3];
var newArr = arr.slice();
newArr[0] = 100;
console.log(arr); // [1,2,3]
-
var a = [1];
var arr = [a,2,3]; //数组里存储的是地址
var newArr = arr.slice();
a[0] = 100;
console.log(newArr); // [[100],2,3]
```
- 3、buffer中的slice不会生成新的内存
```javascript
var buffer = new Buffer("你好");
var newBuffer = buffer.slice(buffer.length-1);
newBuffer[0] = 100;
console.log(buffer); //buffer用的是内存，把内存改掉了，所以会改变
```
- 4、forEach
```javascript
//通过索引拿去buffer的某一项都是10进制的
buffer.forEach(function(item){
  console.log(item)
})
```
- 5、buffer转成字符串 toString
将buffer转换成字符串类型 start end 是截取的buffer的长度
```javascript
buffer.toString('utf8',3,6)
```

- 6、buffer的length
buffer的长度和字符串的长度不相等
``` javascript
var buffer = new Buffer("你好");
var str = "你好";
console.log(buffer.length,str.length); //6 2
```

> 因为buffer是在global上定义的，所以可以直接访问
```javascript
console.log(global.Buffer);
```

- 7、write向buffer中写入内容
参数：string, offset, length, encoding
> string, 写入的内容
offset, 写入的偏移量，默认从0开始
length,写多少个，长度可以不写，默认全部写入
encoding 写入的编码格式，默认是utf8
```javascript
var buffer = new Buffer(12);
var str = "你好";
buffer.write(str,0,3,"utf8");
buffer.write(str1,3,9,"utf8");
buffer.write(str1,0);
console.log(buffer.toString());
```

- 8、copy向buffer中拷贝内容
> targetBuffer,目标buffer
  targetstart,目标的开始
  sourcestart,源的开始
  sourceend 源的结束
```javascript
sourceBuffer.copy(targetBuffer,targetstart,sourcestart,sourceend);
-
var buffer = new Buffer(12);
var buf1 = new Buffer("你");
var buf2 = new Buffer("好呀");
//buf1.copy(buffer,0,0,3);
//buf2.copy(buffer,3,0,6);
buf1.copy(buffer,0);
buf2.copy(buffer,3);
console.log(buffer.toString()); //向buffer中写入的内容时要注意偏移量的设置
```

- 9、concat 连接多个buffer
```
Buffer.concat([buf1,buf2],length);
//list 要连接的列表
//totallength 总长度
-
var buf1 = new Buffer("你");
var buf2 = new Buffer("好呀");
console.log(Buffer.concat([buf1,buf2],10).toString());
```
> 1.可以不写长度，全部拷贝到一个种
  2.写长度过短，写不进去就不要了
  3.长度过长，就不要过长的内容，只要有效的内容


