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
    console.log(111,message)
});
