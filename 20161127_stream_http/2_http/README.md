## 1、http和https
### 1.1 http
- 人与人之间通信，需要一种 传输手段 (声波)和一种彼此都懂的 语言 （比如普
通话）
- 要让这些形形色色的机器能够通过网络进行交互，我们就需要指明一种 协
议 (比如 HTTP/HTTPS)和一种 数据封装格式 (比如 HTML/JSON)
- http指的就是指的就是这种协议+数据格式的交流体系。
### 1.2 https
确保安全的HTTPS
HTTP+加密+认证+完整性保护=HTTPS
```
Connection:keep-alive 一定时间内保持连接
Content-Type:application/x-www-form-urlencoded 类型form表单
Content-Length：16 请求长度
```
> 看百度的ip地址
```javascript
ping www.baidu.com
nslookup www.baidu.com
```

## 2、网站访问流程
### 2.1 发送请求
- 浏览器(或其它客户端如微信)向服务器发出一个 HTTP请求
- 先把 域名解析为IP地址 (chrome缓存1分钟(chrome://net­internals/#dns)­>搜索
操作系统缓存­>读取本地host文件­>发起DNS系统调用­>运营商DNS缓存)
```javascript
host文件位置： c:/windows/system32/drivers/etc/host
123.124.177.178 www.zfpx1.cn
127.0.0.1  www.zf1.cn
```
- 客户端通过随机端口向服务器发起TCP三次握手,建立了 TCP连接
- 连接建立后浏览器就可以 发送HTTP请求 了
- 服务器接收到HTTP请求，解析请求的路径和参数，经过后台的一些处理之
后 生成完整响应 页面
- 服务器将生成的页面作为HTTP 响应体 ，根据不同的处理结果生成 响应头 ，
发回给客户端

### 2.2 得到响应
- 客户端（浏览器）接收到 HTTP 响应,从请求中得到的 HTTP 响应体里是HTML
代码，于是对HTML代码开始 解析
- 解析过程中遇到 引用的服务器上的资源 （额外的 CSS、JS代码，图片、音视
频，附件等），再向服务器发送请求
- 浏览器解析HTML包含的内容，用得到的 CSS 代码进行外观上的进一步 渲
染 ，JS 代码也可能会对外观进行一定的 处理
- 当用户与 页面交互 （点击，悬停等等）时，JS 代码对此作出一定的反应，添
加特效与动画
- 交互的过程中可能需要向服务器索取或提交额外的数据（局部的刷新）,一般不
是跳转就是通过 JS 代码(响应某个动作或者定时)向服务器发送 AJAX 请求
- 服务器再把客户端需要的资源返回，客户端用得到的资源来实现动态效果或 修
  改DOM结构
  
## 3、创建服务
```javascript
//node中自带一个创建服务的模块 http
var http = require('http');
-
//创建一个服务 固定的ip 和 端口号 还有请求和响应
http.createServer(function (req,res) {
    // req请求 是一个可读流
    // res响应 是一个可读可写流
    // pending 等待响应
-
    // 写响应头，告诉浏览器端，响应的内容是什么类型
    //res.writeHead(200,{'Content-Type':'text/plain;charset=utf8','hello':'123'});
    res.setHeader('Content-Type','text/plain;charset=utf8');
    res.setHeader('hello','123');
    res.statusCode = 404; //设置状态码
-
    res.write('hello world');
    res.end('你好');
}).listen(8080,'127.0.0.1', function () {
    console.log("以8080端口启动服务");
});
```
> 响应中文出现乱码问题，设置响应头

### 3.1设置响应头
```javascript
// 写响应头，告诉浏览器端，响应的内容是什么类型
//res.writeHead(200,{'Content-Type':'text/plain;charset=utf8','hello':'123'});
res.setHeader('Content-Type','text/plain;charset=utf8');
res.setHeader('hello','123');
res.statusCode = 404; //设置状态码
```
可以返回html文件
```javascript
//node中自带一个创建服务的模块 http
var http = require('http');
var fs = require('fs');
-
//创建一个服务 固定的ip 和 端口号 还有请求和响应
//路由:通过不同的路径，响应不同的内容
http.createServer(function (req,res) {
    //var data = fs.readFileSync('./index.html'); //同步
    //var data = fs.readFile('./index.html'); //异步
    //res.end(data); //end中有什么内容就会展示给客户端
    res.setHeader('Content-Type','text/html;charset=utf8');
    //可读流pipe到可写流中，pipe中已经调用了end方法
    fs.createReadStream('./index.html').pipe(res);
}).listen(8080);
```
>页面中的js,css返回的均为html;需要根据路径返回不同的内容

### 3.2 请求信息
```javascript
console.log(req.url);//请求路径  http://localhost:8080/?a=1
console.log(req.method);//请求方法
console.log(req.headers);//请求头
```

### 3.3 路径参数
当访问路径时带有查询参数,无法访问到正确路径

- url 模块
url.parse第二个参数将query变为对象格式
```javascript
var url = require('url');
-
var urlobj = url.parse("https://username:password@zhidao.baidu.com:80/question/285286886.html?fr=iks&word=%C8%CB%B4%F3%D1%A1%BE%D9&ie=gbk?entry=home_new_content#hello",true);
console.log(urlobj);
-
Url {
      协议  protocol: 'https:',
      是否有/ slashes: true,
      账号密码 auth: 'username:password',
      主机 host: 'zhidao.baidu.com:80',
      端口号 port: '80',
      主机名 hostname: 'zhidao.baidu.com',
      锚点 hash: '#hello',
      查询串 search: '?fr=iks&word=%C8%CB%B4%F3%D1%A1%BE%D9&ie=gbk?entry=home_new_content',
      查询对象 query: { fr: 'iks', word: '�˴�ѡ��', ie: 'gbk?entry=home_new_content' },
      访问路径 pathname: '/question/285286886.html',
       path: '/question/285286886.html?fr=iks&word=%C8%CB%B4%F3%D1%A1%BE%D9&ie=gbk?entry=home_new_content',
       href: 'https://username:password@zhidao.baidu.com:80/question/285286886.html?fr=iks&word=%C8%CB%B4%F3%D1%A1%BE%D9&ie=gbk?entry=home_new_content#hello'
}
```
> 根据pathname来进行路径的判断

### 3.4 使用mime模块
- 1 安装
```javascript
npm install mime --save
```

- 2 使用
```javascript
//mime 类型对照表（第三方）
var mime = require('mime');
var pathname = "./index.css";
console.log(mime.lookup(pathname)); //  text/css
```

### 3.5 路由
通过不同的路径，响应不同的内容
```javascript
//node中自带一个创建服务的模块 http
var http = require('http');
var fs = require('fs');
var url = require('url');
-
//创建一个服务 固定的ip 和 端口号 还有请求和响应
//路由:通过不同的路径，响应不同的内容
http.createServer(function (req,res) {
    //默认访问http://localhost:8080 相当于/
    var urlObj = url.parse(req.url,true);
    var pathName = urlObj.pathname;
    console.log(pathName);//请求路径
-
    /*console.log(req.url);//请求路径  http://localhost:8080/?a=1
    console.log(req.method);//请求方法
    console.log(req.headers);//请求头*/
-
    if(pathName == '/'){
        res.setHeader('Content-Type','text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }else if(pathName == '/index.css'){
        res.setHeader('Content-Type','text/css;charset=utf8');
        fs.createReadStream('./index.css').pipe(res);
    }else if(pathName == '/index.js'){
        res.setHeader('Content-Type','application/x-javascript;charset=utf8');
        fs.createReadStream('./index.js').pipe(res);
    }
}).listen(8080);
```
- 合并冗余代码
```javascript
    //减少冗余代码
    if(pathName == '/'){
        res.setHeader('Content-Type','text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }else { // ./index.js 使用mime 类型对照表(第三方)
        //在设置之前要先判断文件是否存在，不存在 404
        fs.exists('.' + pathName, function (exists) {
            if(exists){
                res.setHeader('Content-Type',require('mime').lookup(pathName) + ';charset=utf8');
                fs.createReadStream('.' + pathName).pipe(res);
            }else{
                res.statusCode = 404;
                res.end("Not Found");
            }
        })
    }
```


