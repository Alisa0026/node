## Socket.io

### 1.安装模块
```javascript
npm install socket.id
```

### 2.启动服务
```javascript
var express = require('express');
var path = require('path');
var app = express();

//当客户端访问/的时候，返回一个index.html文件
app.get('/',function(req,res){
    res.sendFile(path.resolve('index.html'));
    //res.sendFile('./index.html',{root:__dirname});
});

//app.listen();
/*app.listen();
app.listen = function listen() {
    var server = http.createServer(this);
    server.listen(8080);
    return server.listen.apply(server, arguments);
};*/

//创建一个http服务器，把app传进去作为监听函数，当有请求到来到时候执行此函数
var server = require('http').createServer(app);

//因为websocket服务器依赖http服务器，所以需要把server传进去
var io = require('socket.io')(server);

//websocket服务器监听客户端青丘，当有请求到来的时候
io.on('connection', function (socket) {
    //进入此函数就表示客户端已经连接成功了
    //监听客户端发过来的消息
    socket.on('message', function (message) {
        console.log(message);
        //服务器向客户端发消息
        socket.send('服务器确认:'+ message);
    })
});

//当监听一个端口的时候服务器才算真正启动成功
server.listen(8080);
```

### 3.客户端引用
服务端运行后会在根目录动态生成`socket.io`的客户端js文件 客户端可以通过固定路径`/socket.io/socket.io.js`添加引用
客户端加载`socket.io`文件后会得到一个全局的对象 `io`
`connect` 函数可以接受一个url参数，url可以socket服务的http完整地址，也可以是相对路径，如果省略则表示默认连接当前路径 创建`index.html`文件

```javascript
<script src="/socket.io/socket.io.js"></script>
<script>
    //引入这个脚本后会在window下增加一个io的全局变量，
    // 通过调用它并传入路径，可以连接socket.io服务器
    var socket = io('/');

    socket.on('connect', function () {
        //客户端连接成功后发送消息
        console.log('连接服务器成功');
        socket.send('服务器你好3333');
    });

    socket.on('disconnect',function () {
        console.log('断开服务器连接');

    });
    
    //客户端收到服务器发过来的消息后触发
    socket.on('message',function (message) {
        console.log(message);

    });
</script>
```
### 4.send方法
`send` 函数只是 `emit` 的封装
```javascript
    function send(){
        var args = toArray(arguments);
        args.unshift('message');
        this.emit.apply(this, args);
        return this;
    }
```

`emit` 函数有两个参数

- 第一个参数是自定义的事件名称,发送方发送什么类型的事件名称,接收方就可以通过对应的事件名称来监听接收
- 第二个参数是要发送的数据


