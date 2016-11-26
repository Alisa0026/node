/**
 * Created by root on 2016/11/26.
 */
//var buffer = new Buffer("你好");
//var newBuffer = buffer.slice(buffer.length-1);
//console.log(newBuffer);
//newBuffer[0] = 100;
//console.log(buffer.toString());

/*
var str = "你好";
console.log(buffer.length,str.length); //6 2

console.log(global.Buffer);
*/

//write向buffer中写入内容
/*
var buffer = new Buffer(12);
var str = "你好";
var str1 = "天气真好";
//string, 写入的内容
// offset, 写入的偏移量，默认从0开始
// length,写多少个，长度可以不写，默认全部写入
// encoding 写入的编码格式，默认是utf8
//buffer.write(str,0,3,"utf8");
//buffer.write(str1,3,9,"utf8");
buffer.write(str1,0);
console.log(buffer.toString());*/


//copy方法
//sourceBuffer.copy(targetBuffer,targetstart,sourcestart,sourceend);
//targetBuffer,目标buffer
// targetstart,目标的开始
// sourcestart,源的开始
// sourceend 源的结束
/*var buffer = new Buffer(12);
var buf1 = new Buffer("你");
var buf2 = new Buffer("好呀");
//buf1.copy(buffer,0,0,3);
//buf2.copy(buffer,3,0,6);
buf1.copy(buffer,0);
buf2.copy(buffer,3);
console.log(buffer.toString());*/

//concat 连接多个buffer
/*var buf1 = new Buffer("你");
var buf2 = new Buffer("好呀");
//list 要连接的列表
//totallength 总长度
console.log(Buffer.concat([buf1,buf2]).toString());
console.log(Buffer.concat([buf1,buf2],3000).toString());
//可以不写长度，全部拷贝到一个种
//写长度过短，写不进去就不要了
//长度过长，就不要过长的内容，只要有效的内容*/

/*
var buf1 = new Buffer("你");
var buf2 = new Buffer("好呀");
var buf3 = new Buffer("好呀11");

Buffer.myConcat = function(list,totallength){
    var buffer;
    var sum = 0;

    list.forEach(function(item,i){
        sum += item.length
    });

    if(totallength){
        buffer = new Buffer(totallength);
    }else{
        buffer = new Buffer(sum);
    }

    list.forEach(function(item,i){
        if(i == 0){
            item.copy(buffer,0);
        }else{
            item.copy(buffer,list[i-1].length);
        }
    });

    return buffer.slice(0,sum);
};
console.log(Buffer.myConcat([buf1,buf2,buf3],2000).toString());
console.log(Buffer.myConcat([buf1,buf2,buf3]).toString());*/

//进制转换 & base64
/*
console.log(parseInt("111",2));
console.log(parseInt("0xff",16));
console.log((0xff).toString(2)); //16进制转2进制*/

var baseEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
baseEncoding+='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
baseEncoding+="0123456789";
baseEncoding+="+/";

var buffer = new Buffer('你');
console.log(buffer); //'你' 的16进制
//1.将16进制转换成2进制
console.log((0xe4).toString(2)); //11100100
console.log((0xbd).toString(2)); //10111101
console.log((0xa0).toString(2)); //10100000

//2.将3个八位 转换成4个6位，前面补2个0
//111001 001011 110110 100000
//00111001 00001011 00110110 00100000 这4个值永远不会大于63

//3.将转化后的值，转换成10进制
console.log(parseInt('00111001',2)); //57
console.log(parseInt('00001011',2)); //11
console.log(parseInt('00110110',2)); //54
console.log(parseInt('00100000',2)); //32

//4.在baseEncoding中取值
console.log(baseEncoding[57]+baseEncoding[11]+baseEncoding[54]+baseEncoding[32]); //5L2g => base64编码

