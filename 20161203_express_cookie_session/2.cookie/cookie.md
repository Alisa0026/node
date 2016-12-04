# cookie

##1、设置cookie
- 客户端第一次访问服务器的时候服务器通过响应头向客户端发送Cookie,属性之间用分号空格分隔

```javascript
var http = require('http');
var url = require('url');
/*
* /write 客户端访问此路径的时候，服务端会向客户端写cookie
* /read 客户端访问此路径的时候，客户端会把cookie发送给服务器
* */
http.createServer(function (req,res) {
    //把url从字符串转换成对象，true表示query属性为对象
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;

    if(pathname == '/write'){ //服务端会向客户端写cookie
        //通过响应头Set-Cookie 设置cookie
        res.setHeader('Set-Cookie',['name=tom','age=8']);
        res.end('ok');

    }else if(pathname == '/read'){ //客户端会把cookie发送给服务器
        //headers所有属性全部为小写
        var cookie = req.headers.cookie;
        res.end(cookie);
    }

}).listen(8080);
```

### querystring使用

```javascript
var querystring = require('querystring');
//var query = 'name=zfpx&age=9';
var cookie = 'name#zfpx2; age#9; visit#1'
//第二个参数用来指定字段分隔符
//第三个参数用来指定key和value的分隔符
var queryObj = parse(cookie,'; ','#');
console.log(queryObj);
//reduce
function parse(str,sep,eq){
    var obj ={};
    str.replace(new RegExp(`(\\w+)${eq}(\\w+)`,'g'),function(){
        obj[arguments[1]] = arguments[2];
    });
    return obj;
}

function parse1(str,sep,eq){
    var obj = {};
    var parts = str.split(sep);
    for(var i=0;i<parts.length;i++){
        var field = parts[i].split(eq);
        obj[field[0]] = field[1];
    }
    return obj;
}
```


##2、通过cookie来设置访问次数
```javascript
var http = require('http');
var url = require('url');
var querystring = require('querystring');
/*
* 服务器接收一个/visit的请求
* 客户端第1次访问服务器的时候 返回 欢迎你第1次光临
* 客户端第2次访问服务器的时候 返回 欢迎你第2次光临
* */
http.createServer(function (req,res) {
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;

    if(pathname == '/visit'){
        var cookie = req.headers.cookie;
        var visit = 1;
        if(cookie){
            var cookieObj = querystring.parse(cookie,'; ');
            if(cookieObj.visit){
                visit = parseInt(cookieObj.visit) + 1;
            }
        }

        res.setHeader('Set-Cookie',"visit="+visit);
        res.end(`欢迎你第${visit}次光临`);
    }

}).listen(8080);
```

## 3、参数

### 获取cookie
- 使用cookie-parser中间件

```javascript
$ npm install cookie-parser --save
```

```javascript
app.use(require('cookie-parser')());    //使用中间件
response.cookie(key,value)              //在响应中向客户端设置cookie
request.cookies                         //获取请求中的cookie对象
response.clearCookie('username')        //清除cookie
```

### 各参数介绍

```javascript
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

//基本上所有的中间件模块都是一个函数，都需要调用一下才能放到use里
app.use(cookieParser());

//host地址 C:\Windows\System32\drivers\etc

app.get('/write', function (req,res) {
    //1.普通设置
    res.cookie('name','Tom');
    
    //2、设置此cookie属性属于哪个域名所有
    res.cookie('name','Tom',{domain:'a.zfpx.cn'});
    
    //3、设置此cookie属于哪个路径，只有向此路径发送请求才会发送此cookie
    res.cookie('name','Tom',{path:'/read1'});
   
    //4、设置cookie的有效期，在有效期内可以读取，过了有效期，浏览器删除此cookie
    //maxAge 最大失效时间(毫秒),设置在多少后失效
    res.cookie('name','Tom',{maxAge:10*1000});
    
    //httpOnly 如果在COOKIE中设置了httpOnly属性，则通过程序(JS脚本)将无法读取到COOKIE信息，防止XSS攻击产生
    //Expires 过期时间(秒)，在设置的某个时间点后该 Cookie 就会失效，如 expires=Money, 05-Dec-11 11:11:11 GMT
    res.cookie('name','Tom',{httpOnly:true,expires:new Date(Date.now() + 10*1000)});

    res.send("ok");
});
app.get('/read1', function (req,res) {
    res.send(req.cookies);
});
app.get('/read2', function (req,res) {
    res.send(req.cookies);
});

app.listen(8080);
```

## 原理

### cookie存储原理
```javascript
var document = {
    //此属性值里存放的所有的cookie
    cookies: [],
    //set 表示这个方法是用来给属性赋值的
    set cookie(cookie){ //赋值的时候执行此方法
        //console.log("set cookie")

       /* //方法1
       document.cookies = document.cookies.filter(function (item) {

            return item.split("=")[0] != cookie.split("=")[0]
        });*/

        //find 和 findIndex 是一对
        //方法2
        var index = document.cookies.findIndex(function (item) {
            //console.log(item)
            return item.split("=")[0] == cookie.split("=")[0]
        });

        if(index != -1){
            document.cookies.splice(index,1)
        }
        document.cookies.push(cookie);
    },
    //get 表示这个方法是用来获取属性值的
    get cookie(){//取值的时候执行此方法
        //console.log("get cookie")
        return document.cookies.join('; ')
    }
};

document.cookie = 'name=tom';
document.cookie = 'age=8';
document.cookie = 'name=222';

console.log(document.cookie);  // age=8; name=222
```

## 其他
修改host文件
```javascript
文件位置
windows：C:\Windows\System32\drivers\etc
MAC：/etc/hosts
-
修改host
MAC
sudo vi /etc/hosts
用光标移动到最后一行，然后输入 o
然后会换行并进行编辑模式，把配置项粘贴到此
输入esc退出编辑模式，并输入 :wq退出即可完成编辑
```

