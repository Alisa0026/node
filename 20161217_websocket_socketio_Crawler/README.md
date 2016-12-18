## WebSocket实现 

### 1.安装模块
```javascript
npm install ws --save
```

### 2.引入模块，WebSocket服务器
```javascript
var Server = require('ws').Server;

//创建一个websocket服务器的实例，并指定端口号
var server = new Server({port:8080});


//监听客户端的连接，当客户端连接上来之后执行对应的回调函数
//这个socket是每个客户端特有的，每个客户端连接之后给他建一个socket
server.on('connection', function (socket) {

    //监听客户端发过来的消息
    socket.on('message', function (message) {
        console.log(message);

        //服务器向这个客户端发送消息
        socket.send('服务器说：' + message);
    });
});
```

### 3. Node客户端
```javascript
var Socket = require('ws');

//创建实例的时候，客户端马上要连接服务器
var socket = new Socket('ws://localhost:8080/');

//客户端成功连接服务器以后要执行回调函数
socket.on('open', function () {
    console.log('连接成功')
    socket.send('服务器你好');
});

//客户端可以监听服务器发过来的消息，message是消息的内容
socket.on('message', function (message) {
    console.log(message)
});
```

### 4.events 模块
```javascript
var EventEmitter = require('events');

var e = new EventEmitter();

e.on('click', function () {
    console.log('click');
});

e.emit('click');
```

### 5. 网页客户端
```javascript
<script>
   //连接服务器
   var socket = new WebSocket('ws://localhost:8080/');

   // 注册服务器连接成功事件，因为浏览器JS没有事件发射器，
   // 只能通过增加属性的方法 注册监听函数
   socket.onopen = function(){
       console.log('连接成功');

       socket.send('服务器你好111');
   };

   //注册监听服务器发送过来的消息，回调函数第一个参数是event事件对象，
   //event.data 是服务器发过来的消息
   socket.onmessage = function (event) {
       console.log(event.data)
   }
</script>
```

## 项目部署
华北 1 可用区 B	
115.28.169.86(公)
10.144.164.116(内)

201610Node

### 购买一台阿里云
https://www.aliyun.com

https://ecs.console.aliyun.com

### 连接服务
```javascript
xshell 新建连接
ssh root@123.57.143.189
```

### 安装ubuntu系统
```javascript
更新安装源
apt-get update
```

### 安装mongodb
```javascript
apt-get install mongodb
```

### 安装node
https://nodejs.org/en/download/package-manager
```javascript
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install nodejs
```

### 安装mysql
```javascript
apt-get install mysql-server
apt-get install mysql-clientz
apt-get install libmysqlclient-dev
```

## 布署静态项目
https://zhufengnodejs.github.io/doc/html/node%E8%AF%BE%E7%A8%8B/%E7%8F%A0%E5%B3%B0%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%B8%83%E7%BD%B2.html

### FileZilla客户端软件使用方法
http://jingyan.baidu.com/article/f3ad7d0f1f7e7509c3345b38.html
https://filezilla-project.org/download.php?platform=win32