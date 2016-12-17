# Express
https://zhufengnodejs.github.io/doc/html/node%E8%BF%9B%E9%98%B6/Express.html

### 生成项目配置文件
```javascript
npm init -y
```

### 安装express
```javascript
npm install express --save
```

## 1、使用express 
```javascript
//引入express模块，返回值是一个函数
var express = require('express');
//调用此函数会返回一个新的函数
var app = express();
//app 的核心本质就是一个请求监听函数
app.listen(8080);
```

## 2、get请求
```javascript
app.get(path,function(request, response));
```
>   第一个参数path为请求的路径
    第二个参数为处理请求的回调函数，有两个参数分别是
        - request 代表请求信息
        - response 代表响应信息

```javascript
var express = require('express');
var app = express();
app.get('/',function(req,res){
    res.setHeader("Content-Type","text/html;charset=utf-8");
    res.end('首页');
});
app.get('/about',function(req,res){
    res.setHeader("Content-Type","text/html;charset=utf-8");
    res.end('关于我们');
});
```

```javascript
app内部数组
→
请求方法get 路径/ 回调函数
→
请求方法get 路径/about 回调函数
```

## 3、all
app.all()函数可以匹配所有的HTTP动词 路由中的星号能匹配所有的路径 语法
```javascript
app.all(path,function(request, response));
```
```javascript
var express = require('express');//引入express
var app = express();
//* 匹配所有路径
app.all("*",function(req,res){
 res.send("404");
})
app.listen(8080);
```

## 4、curl客户端使用方法 
```javascript
查看请求行头体的内容
 curl -v http://localhost:8080/signout
-
Connected to localhost (::1) port 8080 (#0)
> GET /signout HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.51.0
> Accept: */*
>
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html;charset=utf-8
< Date: Sat, 03 Dec 2016 03:26:42 GMT
< Connection: keep-alive
< Content-Length: 6
```

## 5、其他
```javascript
fandoc
npm install fandoc -g
```
