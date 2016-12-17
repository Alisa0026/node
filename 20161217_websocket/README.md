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
